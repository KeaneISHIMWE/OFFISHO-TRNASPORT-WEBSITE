import React from 'react';
import { render, screen } from '@testing-library/react';
import CarCard from '../components/CarCard';
import { Car } from '../types';

const mockCar: Car = {
  id: '1',
  name: 'Test Car',
  model: 'Model X',
  description: 'A test car',
  image_url: null,
  rental_price_per_day: 50000,
  buy_price: 5000000,
  sell_price: null,
  car_type: 'luxury',
  event_suitability: ['wedding', 'corporate'],
  availability_status: 'available',
  specs: {},
};

describe('CarCard Component', () => {
  it('renders car information correctly', () => {
    render(<CarCard car={mockCar} />);
    
    expect(screen.getByText('Test Car Model X')).toBeInTheDocument();
    expect(screen.getByText('A test car')).toBeInTheDocument();
    expect(screen.getByText(/RWF 50,000\/day/)).toBeInTheDocument();
  });

  it('displays availability badge', () => {
    render(<CarCard car={mockCar} />);
    
    expect(screen.getByText('AVAILABLE')).toBeInTheDocument();
  });

  it('shows rent now button when car is available', () => {
    render(<CarCard car={mockCar} />);
    
    expect(screen.getByText('Rent Now')).toBeInTheDocument();
  });
});
