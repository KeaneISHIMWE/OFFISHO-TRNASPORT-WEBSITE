export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone_number?: string | null;
  role: 'user' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export interface Car {
  id: string;
  _id?: string;
  name: string;
  model: string;
  description: string | null;
  image_url: string | null;
  storageId?: string;
  rental_price_per_day: number;
  buy_price: number | null;
  sell_price: number | null;
  car_type: 'luxury' | 'suv' | 'sedan' | 'convertible' | 'van';
  event_suitability: string[];
  availability_status: 'available' | 'rented' | 'sold' | 'maintenance';
  specs: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Request {
  id: string;
  _id?: string;
  user_id: string;
  car_id: string;
  request_type: 'rent' | 'buy' | 'sell';
  with_driver: boolean;
  deposit_amount: number;
  total_amount: number;
  event_date: string | null;
  event_type: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  agreement_text: string | null;
  payment_method: string | null;
  created_at?: string;
  updated_at?: string;
  car_name?: string;
  car_model?: string;
  car_image?: string;
  user_name?: string;
  user_email?: string;
}

export interface PaymentInfo {
  mtnMomo: string;
  bankAccount: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  errors?: Array<{ field: string; message: string }>;
}
