export interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  role: 'user' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface Car {
  id: string;
  name: string;
  model: string;
  description: string | null;
  image_url: string | null;
  rental_price_per_day: number;
  buy_price: number | null;
  sell_price: number | null;
  car_type: 'luxury' | 'suv' | 'sedan' | 'convertible' | 'van';
  event_suitability: string[];
  availability_status: 'available' | 'rented' | 'sold' | 'maintenance';
  specs: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Request {
  id: string;
  user_id: string;
  car_id: string;
  request_type: 'rent' | 'buy' | 'sell';
  with_driver: boolean;
  deposit_amount: number;
  total_amount: number;
  event_date: Date | null;
  event_type: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  agreement_text: string | null;
  payment_method: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: string;
  request_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string | null;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
