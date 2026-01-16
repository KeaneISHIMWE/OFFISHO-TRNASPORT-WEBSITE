import { Request, Response } from 'express';
import { convexClient } from '../models/db';
import { Car } from '../types';
import { uploadToCloudinary } from '../middleware/upload';
import { api } from '../../convex/_generated/api';

export const getCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, minPrice, maxPrice, availability, search, eventType } = req.query;

    const cars = await convexClient.query(api.cars.getCars, {
      type: type as string | undefined,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      availability: availability as string | undefined,
      search: search as string | undefined,
      eventType: eventType as string | undefined,
    });

    res.json({ cars });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const car = await convexClient.query(api.cars.getCarById, { id: id as any });

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    res.json({ car });
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

    const carId = await convexClient.mutation(api.cars.createCar, {
      name,
      model,
      description: description || null,
      image_url: imageUrl,
      rental_price_per_day: parseFloat(rental_price_per_day),
      buy_price: buy_price ? parseFloat(buy_price) : null,
      sell_price: sell_price ? parseFloat(sell_price) : null,
      car_type: car_type as any,
      event_suitability: Array.isArray(event_suitability) ? event_suitability : (event_suitability ? JSON.parse(event_suitability) : []),
      availability_status: availability_status || 'available',
      specs: specs || {},
    });

    const car = await convexClient.query(api.cars.getCarById, { id: carId });

    res.status(201).json({ car });
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    const existingCar = await convexClient.query(api.cars.getCarById, { id: id as any });
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

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (model !== undefined) updateData.model = model;
    if (description !== undefined) updateData.description = description || null;
    if (imageUrl !== undefined) updateData.image_url = imageUrl;
    if (rental_price_per_day !== undefined) updateData.rental_price_per_day = parseFloat(rental_price_per_day);
    if (buy_price !== undefined) updateData.buy_price = buy_price ? parseFloat(buy_price) : null;
    if (sell_price !== undefined) updateData.sell_price = sell_price ? parseFloat(sell_price) : null;
    if (car_type !== undefined) updateData.car_type = car_type;
    if (event_suitability !== undefined) updateData.event_suitability = Array.isArray(event_suitability) ? event_suitability : JSON.parse(event_suitability);
    if (availability_status !== undefined) updateData.availability_status = availability_status;
    if (specs !== undefined) updateData.specs = specs;

    await convexClient.mutation(api.cars.updateCar, {
      id: id as any,
      ...updateData,
    });

    const car = await convexClient.query(api.cars.getCarById, { id: id as any });

    res.json({ car });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await convexClient.mutation(api.cars.deleteCar, { id: id as any });

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
