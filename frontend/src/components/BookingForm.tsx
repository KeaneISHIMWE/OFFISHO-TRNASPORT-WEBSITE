import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { requestsAPI, carsAPI } from '../services/api';
import { Car } from '../types';

interface BookingFormProps {
  carId: string;
  car: Car;
}

const DRIVER_FEE = 10000; // 10,000 FRW
const DEPOSIT_AMOUNT = 50000; // 50,000 FRW

const bookingSchema = z.object({
  request_type: z.enum(['rent', 'buy', 'sell']),
  with_driver: z.boolean().optional(),
  event_date: z.string().optional(),
  event_type: z.string().optional(),
  agreement_text: z.string().optional(),
  payment_method: z.string().optional(),
  agreed_to_terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm: React.FC<BookingFormProps> = ({ carId, car }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [showTerms, setShowTerms] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      request_type: 'rent',
      with_driver: false,
      agreed_to_terms: false,
    },
  });

  const requestType = watch('request_type');
  const withDriver = watch('with_driver');

  useEffect(() => {
    calculateTotal();
  }, [requestType, withDriver]);

  const calculateTotal = () => {
    let total = 0;

    if (requestType === 'rent') {
      total = car.rental_price_per_day;
      if (withDriver) {
        total += DRIVER_FEE;
      } else {
        total += DEPOSIT_AMOUNT;
      }
    } else if (requestType === 'buy' && car.buy_price) {
      total = car.buy_price;
    } else if (requestType === 'sell' && car.sell_price) {
      total = car.sell_price;
    }

    setTotalAmount(total);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const requestData: any = {
        car_id: carId,
        request_type: data.request_type,
        with_driver: data.with_driver || false,
        event_date: data.event_date || undefined,
        event_type: data.event_type || undefined,
        agreement_text: data.agreement_text || undefined,
        payment_method: data.payment_method || undefined,
      };

      await requestsAPI.createRequest(requestData);
      navigate('/cars', { state: { message: 'Request submitted successfully!' } });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PAYMENT_INFO = {
    mtnMomo: '+250 788 123 456',
    bankAccount: 'Account: 1234567890, Bank: Bank of Rwanda',
  };

  const TERMS_AND_CONDITIONS = `
    1. Rental Agreement: By submitting this request, you agree to the terms and conditions.
    2. Payment: Full payment must be made before the rental period begins.
    3. Deposit: A refundable deposit of 50,000 FRW is required for rentals without driver.
    4. Driver Fee: An additional 10,000 FRW applies for rentals with driver.
    5. Cancellation: Cancellations must be made at least 24 hours in advance.
    6. Damage: Any damage to the vehicle will be charged accordingly.
    7. Refund: Deposit will be refunded if no damage is reported.
  `;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-navy-blue mb-6">Booking Request</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!isAuthenticated && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Please <a href="/login" className="underline">login</a> to submit a booking request.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Request Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Request Type
          </label>
          <select
            {...register('request_type')}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
          >
            <option value="rent">Rent</option>
            {car.buy_price && <option value="buy">Buy</option>}
            {car.sell_price && <option value="sell">Sell</option>}
          </select>
        </div>

        {/* Rental-specific fields */}
        {requestType === 'rent' && (
          <>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('with_driver')}
                  className="w-4 h-4 text-sky-blue border-gray-300 rounded focus:ring-sky-blue"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Rent with driver (+{formatPrice(DRIVER_FEE)})
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                If unchecked, a refundable deposit of {formatPrice(DEPOSIT_AMOUNT)} will be added.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                {...register('event_date')}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type
              </label>
              <select
                {...register('event_type')}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              >
                <option value="">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="tour">Tour</option>
                <option value="party">Party</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        )}

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            {...register('payment_method')}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
          >
            <option value="">Select payment method</option>
            <option value="mtn_momo">MTN MoMo</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-2">Price Breakdown</h3>
          <div className="space-y-1 text-sm">
            {requestType === 'rent' && (
              <>
                <div className="flex justify-between">
                  <span>Base Rental:</span>
                  <span>{formatPrice(car.rental_price_per_day)}</span>
                </div>
                {withDriver ? (
                  <div className="flex justify-between">
                    <span>Driver Fee:</span>
                    <span>{formatPrice(DRIVER_FEE)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span>Deposit (Refundable):</span>
                    <span>{formatPrice(DEPOSIT_AMOUNT)}</span>
                  </div>
                )}
              </>
            )}
            {requestType === 'buy' && car.buy_price && (
              <div className="flex justify-between">
                <span>Buy Price:</span>
                <span>{formatPrice(car.buy_price)}</span>
              </div>
            )}
            {requestType === 'sell' && car.sell_price && (
              <div className="flex justify-between">
                <span>Sell Price:</span>
                <span>{formatPrice(car.sell_price)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span className="text-sky-blue">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-sky-blue bg-opacity-10 p-4 rounded">
          <h3 className="font-semibold text-navy-blue mb-2">Payment Information</h3>
          <p className="text-sm text-gray-700 mb-1">
            <strong>MTN MoMo:</strong> {PAYMENT_INFO.mtnMomo}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Bank Transfer:</strong> {PAYMENT_INFO.bankAccount}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Please include your request ID when making payment.
          </p>
        </div>

        {/* Terms and Conditions */}
        <div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('agreed_to_terms')}
              className="mt-1 w-4 h-4 text-sky-blue border-gray-300 rounded focus:ring-sky-blue"
            />
            <label className="text-sm text-gray-700">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="text-sky-blue hover:underline"
              >
                terms and conditions
              </button>
            </label>
          </div>
          {errors.agreed_to_terms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreed_to_terms.message}</p>
          )}
        </div>

        {showTerms && (
          <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 whitespace-pre-line">
            {TERMS_AND_CONDITIONS}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isAuthenticated}
          className="w-full bg-sky-blue text-white py-3 rounded font-semibold hover:bg-opacity-80 transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
