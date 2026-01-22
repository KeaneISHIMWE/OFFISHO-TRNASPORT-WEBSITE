import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../models/db';
import { Car } from '../types';
import { uploadToCloudinary } from '../middleware/upload';

export const getCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, minPrice, maxPrice, availability, search, eventType } = req.query;

    // Test database connection first
    try {
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
    } catch (dbError: any) {
      console.error('Database connection error in getCars:', dbError);
      console.error('Error code:', dbError.code);
      console.error('Error message:', dbError.message);
      
      let errorMessage = 'Database connection failed';
      if (dbError.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to database server. Please check if the database is running.';
      } else if (dbError.code === 'ER_ACCESS_DENIED_ERROR') {
        errorMessage = 'Database authentication failed. Check your credentials.';
      } else if (dbError.code === 'ER_BAD_DB_ERROR') {
        errorMessage = 'Database does not exist. Please run the schema.';
      } else if (dbError.code === 'ENOTFOUND' || dbError.code === 'ETIMEDOUT') {
        errorMessage = 'Cannot reach database server. Check your network and DB_HOST.';
      }
      
      res.status(500).json({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? `${dbError.code}: ${dbError.message}` : undefined
      });
      return;
    }

    let query = 'SELECT * FROM cars WHERE 1=1';
    const params: any[] = [];

    if (type) {
      query += ' AND car_type = ?';
      params.push(type);
    }

    if (minPrice) {
      query += ' AND rental_price_per_day >= ?';
      params.push(parseFloat(minPrice as string));
    }

    if (maxPrice) {
      query += ' AND rental_price_per_day <= ?';
      params.push(parseFloat(maxPrice as string));
    }

    if (availability) {
      query += ' AND availability_status = ?';
      params.push(availability);
    }

    if (search) {
      query += ' AND (name LIKE ? OR model LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (eventType) {
      query += ' AND JSON_CONTAINS(event_suitability, ?)';
      params.push(JSON.stringify(eventType));
    }

    query += ' ORDER BY created_at DESC';

    const [cars] = await pool.execute(query, params) as any[];

    // Parse JSON fields
    const formattedCars = cars.map((car: any) => ({
      ...car,
      event_suitability: car.event_suitability ? JSON.parse(car.event_suitability) : [],
      specs: car.specs ? JSON.parse(car.specs) : {},
    }));

    res.json({ cars: formattedCars });
  } catch (error: any) {
    console.error('Get cars error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Provide specific error messages
    let errorMessage = 'Failed to fetch cars';
    if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Cars table does not exist. Please run the database schema.';
    } else if (error.code?.startsWith('ER_')) {
      errorMessage = `Database error: ${error.code}`;
    }
    
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [cars] = await pool.execute(
      'SELECT * FROM cars WHERE id = ?',
      [id]
    ) as any[];

    const car = cars[0];

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    // Parse JSON fields
    const formattedCar = {
      ...car,
      event_suitability: car.event_suitability ? JSON.parse(car.event_suitability) : [],
      specs: car.specs ? JSON.parse(car.specs) : {},
    };

    res.json({ car: formattedCar });
  } catch (error) {
    console.error('Get car by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      model,
      description,
      rental_price_per_day,
      buy_price,
      sell_price,
      car_type,
      event_suitability,
      availability_status,
      specs,
    } = req.body;

    let imageUrl = null;

    // Upload image if provided
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        res.status(500).json({ error: 'Failed to upload image' });
        return;
      }
    }

    const eventSuitabilityJson = Array.isArray(event_suitability)
      ? JSON.stringify(event_suitability)
      : event_suitability || '[]';

    const specsJson = specs ? JSON.stringify(specs) : '{}';

    // Generate UUID for car
    const carId = uuidv4();

    await pool.execute(
      `INSERT INTO cars (
        id, name, model, description, image_url, rental_price_per_day,
        buy_price, sell_price, car_type, event_suitability,
        availability_status, specs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        carId,
        name,
        model,
        description || null,
        imageUrl,
        parseFloat(rental_price_per_day),
        buy_price ? parseFloat(buy_price) : null,
        sell_price ? parseFloat(sell_price) : null,
        car_type,
        eventSuitabilityJson,
        availability_status || 'available',
        specsJson,
      ]
    );

    // Get created car
    const [cars] = await pool.execute(
      'SELECT * FROM cars WHERE id = ?',
      [carId]
    ) as any[];

    const car = cars[0];

    // Parse JSON fields
    const formattedCar = {
      ...car,
      event_suitability: car.event_suitability ? JSON.parse(car.event_suitability) : [],
      specs: car.specs ? JSON.parse(car.specs) : {},
    };

    res.status(201).json({ car: formattedCar });
  } catch (error: any) {
    console.error('Create car error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      model,
      description,
      rental_price_per_day,
      buy_price,
      sell_price,
      car_type,
      event_suitability,
      availability_status,
      specs,
    } = req.body;

    // Check if car exists
    const [existingCars] = await pool.execute(
      'SELECT * FROM cars WHERE id = ?',
      [id]
    ) as any[];

    const existingCar = existingCars[0];
    if (!existingCar) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    let imageUrl = existingCar.image_url;

    // Upload new image if provided
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file);
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        res.status(500).json({ error: 'Failed to upload image' });
        return;
      }
    }

    // Build update query dynamically
    const updates: string[] = [];
    const params: any[] = [];

    if (name !== undefined) {
      updates.push('name = ?');
      params.push(name);
    }
    if (model !== undefined) {
      updates.push('model = ?');
      params.push(model);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      params.push(description || null);
    }
    if (imageUrl !== undefined) {
      updates.push('image_url = ?');
      params.push(imageUrl);
    }
    if (rental_price_per_day !== undefined) {
      updates.push('rental_price_per_day = ?');
      params.push(parseFloat(rental_price_per_day));
    }
    if (buy_price !== undefined) {
      updates.push('buy_price = ?');
      params.push(buy_price ? parseFloat(buy_price) : null);
    }
    if (sell_price !== undefined) {
      updates.push('sell_price = ?');
      params.push(sell_price ? parseFloat(sell_price) : null);
    }
    if (car_type !== undefined) {
      updates.push('car_type = ?');
      params.push(car_type);
    }
    if (event_suitability !== undefined) {
      updates.push('event_suitability = ?');
      const eventSuitabilityJson = Array.isArray(event_suitability)
        ? JSON.stringify(event_suitability)
        : JSON.stringify(event_suitability);
      params.push(eventSuitabilityJson);
    }
    if (availability_status !== undefined) {
      updates.push('availability_status = ?');
      params.push(availability_status);
    }
    if (specs !== undefined) {
      updates.push('specs = ?');
      params.push(JSON.stringify(specs));
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    params.push(id);

    await pool.execute(
      `UPDATE cars SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    // Get updated car
    const [cars] = await pool.execute(
      'SELECT * FROM cars WHERE id = ?',
      [id]
    ) as any[];

    const car = cars[0];

    // Parse JSON fields
    const formattedCar = {
      ...car,
      event_suitability: car.event_suitability ? JSON.parse(car.event_suitability) : [],
      specs: car.specs ? JSON.parse(car.specs) : {},
    };

    res.json({ car: formattedCar });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await pool.execute('DELETE FROM cars WHERE id = ?', [id]);

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
