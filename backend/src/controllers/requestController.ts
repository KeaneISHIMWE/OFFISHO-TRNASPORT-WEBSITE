import { Request, Response } from 'express';
import { convexClient } from '../models/db';
import { sendRequestConfirmationEmail, sendAdminNotificationEmail } from '../utils/email';
import { api } from '../../convex/_generated/api';

const DRIVER_FEE = 10000; // 10,000 FRW
const DEPOSIT_AMOUNT = 50000; // 50,000 FRW (refundable)

export const getRequests = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Users can only see their own requests, admins see all
    const userId = req.user.role !== 'admin' ? (req.user.userId as any) : undefined;
    const requests = await convexClient.query(api.requests.getRequests, { userId });

    // Enrich requests with car and user data
    const enrichedRequests = await Promise.all(
      requests.map(async (req: any) => {
        const car = await convexClient.query(api.cars.getCarById, { id: req.car_id });
        const user = await convexClient.query(api.users.getUserById, { id: req.user_id });
        return {
          ...req,
          id: req._id,
          car_name: car?.name,
          car_model: car?.model,
          car_image: car?.image_url,
          user_name: user?.name,
          user_email: user?.email,
        };
      })
    );

    res.json({ requests: enrichedRequests });
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

    const request = await convexClient.query(api.requests.getRequestById, { id: id as any });

    if (!request) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    // Users can only see their own requests
    if (req.user.role !== 'admin' && request.user_id !== req.user.userId) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Enrich with car and user data
    const car = await convexClient.query(api.cars.getCarById, { id: request.car_id });
    const user = await convexClient.query(api.users.getUserById, { id: request.user_id });

    const enrichedRequest = {
      ...request,
      id: request._id,
      car_name: car?.name,
      car_model: car?.model,
      car_image: car?.image_url,
      user_name: user?.name,
      user_email: user?.email,
    };

    res.json({ request: enrichedRequest });
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
    const car = await convexClient.query(api.cars.getCarById, { id: car_id as any });
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
      totalAmount = car.rental_price_per_day;
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
      totalAmount = car.buy_price;
    } else if (request_type === 'sell') {
      if (!car.sell_price) {
        res.status(400).json({ error: 'Car sell price not set' });
        return;
      }
      totalAmount = car.sell_price;
    }

    // Parse event_date if provided
    let eventDateTimestamp: number | null = null;
    if (event_date) {
      eventDateTimestamp = new Date(event_date).getTime();
    }

    // Create request
    const requestId = await convexClient.mutation(api.requests.createRequest, {
      user_id: req.user.userId as any,
      car_id: car_id as any,
      request_type: request_type as any,
      with_driver: with_driver || false,
      deposit_amount: depositAmount,
      total_amount: totalAmount,
      event_date: eventDateTimestamp,
      event_type: event_type || null,
      agreement_text: agreement_text || null,
      payment_method: payment_method || null,
    });

    const newRequest = await convexClient.query(api.requests.getRequestById, { id: requestId });

    // Get user details for email
    const user = await convexClient.query(api.users.getUserById, { id: req.user.userId as any });

    if (!user || !newRequest) {
      res.status(500).json({ error: 'Failed to create request' });
      return;
    }

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
      request: {
        ...newRequest,
        id: newRequest._id,
      },
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
    const request = await convexClient.query(api.requests.getRequestById, { id: id as any });

    if (!request) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    // Update request status
    const updatedRequest = await convexClient.mutation(api.requests.updateRequestStatus, {
      id: id as any,
      status: status as any,
    });

    // Update car availability if approved
    if (status === 'approved' && request.request_type === 'rent') {
      await convexClient.mutation(api.requests.updateCarAvailability, {
        car_id: request.car_id,
        availability_status: 'rented',
      });
    } else if (status === 'completed' || status === 'cancelled') {
      // Reset car availability
      await convexClient.mutation(api.requests.updateCarAvailability, {
        car_id: request.car_id,
        availability_status: 'available',
      });
    } else if (status === 'approved' && request.request_type === 'buy') {
      await convexClient.mutation(api.requests.updateCarAvailability, {
        car_id: request.car_id,
        availability_status: 'sold',
      });
    }

    // Get car and user for email
    const car = await convexClient.query(api.cars.getCarById, { id: request.car_id });
    const user = await convexClient.query(api.users.getUserById, { id: request.user_id });

    // Send email notification to user
    try {
      const { sendStatusUpdateEmail } = await import('../utils/email');
      await sendStatusUpdateEmail(
        user!.email,
        user!.name,
        updatedRequest!,
        { car_name: car?.name || '', car_model: car?.model || '' }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    res.json({
      request: {
        ...updatedRequest,
        id: updatedRequest?._id,
      },
    });
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
    const request = await convexClient.query(api.requests.getRequestById, { id: id as any });

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

    await convexClient.mutation(api.requests.deleteRequest, { id: id as any });

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
