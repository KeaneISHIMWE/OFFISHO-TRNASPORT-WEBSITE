import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../models/db';
import { sendRequestConfirmationEmail, sendAdminNotificationEmail } from '../utils/email';

const DRIVER_FEE = 10000; // 10,000 FRW
const DEPOSIT_AMOUNT = 50000; // 50,000 FRW (refundable)

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Users can only see their own requests, admins see all
    let query = `
      SELECT r.*, c.name as car_name, c.model as car_model, c.image_url as car_image,
             u.name as user_name, u.email as user_email
      FROM requests r
      JOIN cars c ON r.car_id = c.id
      JOIN users u ON r.user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (req.user.role !== 'admin') {
      query += ' AND r.user_id = ?';
      params.push(req.user.userId);
    }

    query += ' ORDER BY r.created_at DESC';

    const [requests] = await pool.execute(query, params) as any[];

    res.json({ requests });
  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRequestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const [requests] = await pool.execute(
      `SELECT r.*, c.name as car_name, c.model as car_model, c.image_url as car_image,
              u.name as user_name, u.email as user_email
       FROM requests r
       JOIN cars c ON r.car_id = c.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [id]
    ) as any[];

    const request = requests[0];

    if (!request) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    // Users can only see their own requests
    if (req.user.role !== 'admin' && request.user_id !== req.user.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json({ request });
  } catch (error) {
    console.error('Get request by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const {
      car_id,
      request_type,
      with_driver,
      event_date,
      event_type,
      agreement_text,
      payment_method,
    } = req.body;

    // Get car details
    const [cars] = await pool.execute(
      'SELECT * FROM cars WHERE id = ?',
      [car_id]
    ) as any[];

    const car = cars[0];
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    // Check availability
    if (car.availability_status !== 'available') {
      res.status(400).json({ error: 'Car is not available' });
      return;
    }

    // Calculate total amount
    let totalAmount = 0;
    let depositAmount = 0;

    if (request_type === 'rent') {
      totalAmount = parseFloat(car.rental_price_per_day);
      if (with_driver) {
        totalAmount += DRIVER_FEE;
      } else {
        depositAmount = DEPOSIT_AMOUNT;
        totalAmount += DEPOSIT_AMOUNT;
      }
    } else if (request_type === 'buy') {
      if (!car.buy_price) {
        res.status(400).json({ error: 'Car is not available for purchase' });
        return;
      }
      totalAmount = parseFloat(car.buy_price);
    } else if (request_type === 'sell') {
      if (!car.sell_price) {
        res.status(400).json({ error: 'Car sell price not set' });
        return;
      }
      totalAmount = parseFloat(car.sell_price);
    }

    // Generate UUID for request
    const requestId = uuidv4();

    // Create request
    await pool.execute(
      `INSERT INTO requests (
        id, user_id, car_id, request_type, with_driver, deposit_amount,
        total_amount, event_date, event_type, agreement_text, payment_method
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        requestId,
        req.user.userId,
        car_id,
        request_type,
        with_driver || false,
        depositAmount,
        totalAmount,
        event_date || null,
        event_type || null,
        agreement_text || null,
        payment_method || null,
      ]
    );

    // Get created request with joins
    const [newRequests] = await pool.execute(
      `SELECT r.*, c.name as car_name, c.model as car_model, c.image_url as car_image,
              u.name as user_name, u.email as user_email
       FROM requests r
       JOIN cars c ON r.car_id = c.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [requestId]
    ) as any[];

    const newRequest = newRequests[0];

    if (!newRequest) {
      res.status(500).json({ error: 'Failed to create request' });
      return;
    }

    // Get user details for email (including phone_number)
    const [users] = await pool.execute(
      'SELECT id, name, email, phone_number, role FROM users WHERE id = ?',
      [req.user.userId]
    ) as any[];

    const user = users[0];

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Ensure phone_number is properly set (handle MySQL NULL)
    if (user.phone_number === null || user.phone_number === undefined) {
      user.phone_number = null;
    }

    // Debug: Log user data being sent to email
    console.log('📧 User data for email:', {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      phone_number_type: typeof user.phone_number,
      phone_number_is_null: user.phone_number === null,
      phone_number_is_undefined: user.phone_number === undefined,
      phone_number_raw: JSON.stringify(user.phone_number)
    });

    // Send confirmation email to user
    try {
      await sendRequestConfirmationEmail(user.email, user.name, newRequest, car);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }

    // Send notification to admin
    try {
      await sendAdminNotificationEmail(newRequest, car, user);
    } catch (emailError) {
      console.error('Admin email sending error:', emailError);
    }

    res.status(201).json({
      message: 'Request created successfully',
      request: newRequest,
    });
  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRequestStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403).json({ error: 'Admin access required' });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected', 'completed', 'cancelled'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    // Get request details
    const [requests] = await pool.execute(
      'SELECT * FROM requests WHERE id = ?',
      [id]
    ) as any[];

    const request = requests[0];

    if (!request) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    // Update request status
    await pool.execute(
      'UPDATE requests SET status = ? WHERE id = ?',
      [status, id]
    );

    // Update car availability if approved
    if (status === 'approved' && request.request_type === 'rent') {
      await pool.execute(
        'UPDATE cars SET availability_status = ? WHERE id = ?',
        ['rented', request.car_id]
      );
    } else if (status === 'completed' || status === 'cancelled') {
      // Reset car availability
      await pool.execute(
        'UPDATE cars SET availability_status = ? WHERE id = ?',
        ['available', request.car_id]
      );
    } else if (status === 'approved' && request.request_type === 'buy') {
      await pool.execute(
        'UPDATE cars SET availability_status = ? WHERE id = ?',
        ['sold', request.car_id]
      );
    }

    // Get updated request with joins
    const [updatedRequests] = await pool.execute(
      `SELECT r.*, c.name as car_name, c.model as car_model, c.image_url as car_image,
              u.name as user_name, u.email as user_email
       FROM requests r
       JOIN cars c ON r.car_id = c.id
       JOIN users u ON r.user_id = u.id
       WHERE r.id = ?`,
      [id]
    ) as any[];

    const updatedRequest = updatedRequests[0];

    // Get car and user for email
    const [cars] = await pool.execute(
      'SELECT * FROM cars WHERE id = ?',
      [request.car_id]
    ) as any[];

    const car = cars[0];

    const [users] = await pool.execute(
      'SELECT id, name, email, phone_number, role FROM users WHERE id = ?',
      [request.user_id]
    ) as any[];

    const user = users[0];

    // Send email notification to user
    try {
      const { sendStatusUpdateEmail } = await import('../utils/email');
      await sendStatusUpdateEmail(
        user.email,
        user.name,
        updatedRequest,
        { car_name: car?.name || '', car_model: car?.model || '' }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    res.json({ request: updatedRequest });
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    // Check if request exists and user has permission
    const [requests] = await pool.execute(
      'SELECT * FROM requests WHERE id = ?',
      [id]
    ) as any[];

    const request = requests[0];

    if (!request) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    // Users can only delete their own requests, admins can delete any
    if (req.user.role !== 'admin' && request.user_id !== req.user.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Only allow deletion of pending or cancelled requests
    if (!['pending', 'cancelled'].includes(request.status)) {
      res.status(400).json({
        error: 'Cannot delete request with current status. Please cancel it first.',
      });
      return;
    }

    await pool.execute('DELETE FROM requests WHERE id = ?', [id]);

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
