import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextConvex';
import { useNotification } from '../context/NotificationContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Car } from '../types';
import { CreditCard, Calendar, AlertCircle, Info, Check, User } from 'lucide-react';

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
  agreed_to_terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm: React.FC<BookingFormProps> = ({ carId, car }) => {
  const { isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
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
  }, [requestType, withDriver, car.rental_price_per_day, car.buy_price, car.sell_price]);

  const calculateTotal = () => {
    let total = 0;

    if (requestType === 'rent') {
      // Ensure rental_price_per_day is a number
      const baseRental = typeof car.rental_price_per_day === 'string'
        ? parseFloat(car.rental_price_per_day)
        : car.rental_price_per_day;

      total = baseRental || 0;

      if (withDriver) {
        total += DRIVER_FEE;
      } else {
        total += DEPOSIT_AMOUNT;
      }
    } else if (requestType === 'buy' && car.buy_price) {
      total = typeof car.buy_price === 'string'
        ? parseFloat(car.buy_price)
        : car.buy_price;
    } else if (requestType === 'sell' && car.sell_price) {
      total = typeof car.sell_price === 'string'
        ? parseFloat(car.sell_price)
        : car.sell_price;
    }

    setTotalAmount(total);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('RWF', 'FRW');
  };

  const createRequestMutation = useMutation(api.requests.create);

  const onSubmit = async (data: BookingFormData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createRequestMutation({
        car_id: carId as Id<"cars">,
        request_type: data.request_type as "rent" | "buy" | "sell",
        with_driver: data.with_driver || false,
        event_date: data.event_date || undefined,
        event_type: data.event_type || undefined,
        agreement_text: data.agreement_text || undefined,
      });

      showNotification('Request submitted successfully! We will review it shortly.', 'success');
      navigate('/cars');
    } catch (err: any) {
      console.error("Booking error:", err);
      setError(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PAYMENT_INFO = {
    mtnMomo: '0 785 344 214',
    bankAccount: 'Account: 2001161010013164, Bank: NCBA',
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
    <div className="bg-transparent">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {!isAuthenticated && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-3 rounded-xl mb-6 flex items-center">
          <Info className="w-5 h-5 mr-2" />
          <span>
            Please <a href="/login" className="underline font-bold hover:text-yellow-400">login</a> to submit a booking request.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Request Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Request Type
          </label>
          <div className="nebula-select-container">
            <select
              {...register('request_type')}
              className="nebula-select"
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
              {car.sell_price && <option value="sell">Sell</option>}
            </select>
          </div>
        </div>

        {/* Rental-specific fields */}
        {requestType === 'rent' && (
          <>
            <div>
              <label className="flex items-start space-x-3 cursor-pointer p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-colors">
                <input
                  type="checkbox"
                  {...register('with_driver')}
                  className="mt-1 w-5 h-5 text-primary border-white/20 rounded focus:ring-primary bg-background"
                />
                <div>
                  <span className="block text-sm font-semibold text-white flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Rent with driver (+{formatPrice(DRIVER_FEE)})
                  </span>
                  <p className="text-xs text-slate-400 mt-1">
                    If unchecked, a refundable deposit of {formatPrice(DEPOSIT_AMOUNT)} will be added.
                  </p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Event Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register('event_date')}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500"
                />
                <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-slate-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Event Type
              </label>
              <div className="nebula-select-container">
                <select
                  {...register('event_type')}
                  className="nebula-select"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="tour">Tour</option>
                  <option value="party">Party</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </>
        )}



        {/* Price Breakdown */}
        <div className="bg-background/50 p-6 rounded-xl border border-white/5">
          <h3 className="font-semibold text-white mb-4">Price Breakdown</h3>
          <div className="space-y-3 text-sm text-slate-300">
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
            <div className="flex justify-between font-bold text-lg pt-4 border-t border-white/10 text-white">
              <span>Total:</span>
              <span className="text-primary">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Manual Payment Notification */}
        <div className="bg-purple-electric/10 p-6 rounded-xl border border-purple-electric/20">
          <h3 className="font-semibold text-purple-electric mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Manual Payment Required
          </h3>
          <p className="text-sm text-slate-300 mb-3">
            Payments are processed manually. Once your request is submitted, please contact our support team to complete your payment.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-slate-300">
              <strong className="text-white">Support Phone:</strong> {PAYMENT_INFO.mtnMomo}
            </p>
            <div className="bg-background/40 p-3 rounded-lg border border-white/5 mt-2">
              <p className="text-xs text-slate-400 mb-1 font-medium italic">Payment Details:</p>
              <p className="text-xs text-slate-300"><strong className="text-white">MoMo:</strong> {PAYMENT_INFO.mtnMomo}</p>
              <p className="text-xs text-slate-300"><strong className="text-white">Bank:</strong> {PAYMENT_INFO.bankAccount}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 italic">
            * Please mention your Request ID after submitting this form.
          </p>
        </div>

        {/* Terms and Conditions */}
        <div>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('agreed_to_terms')}
              className="mt-1 w-4 h-4 text-primary border-white/20 rounded focus:ring-primary bg-background"
            />
            <label className="text-sm text-slate-300">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTerms(!showTerms)}
                className="text-primary hover:underline hover:text-primary/80 font-medium"
              >
                terms and conditions
              </button>
            </label>
          </div>
          {errors.agreed_to_terms && (
            <p className="text-red-400 text-sm mt-1">{errors.agreed_to_terms.message}</p>
          )}
        </div>

        {showTerms && (
          <div className="bg-background p-4 rounded-xl text-sm text-slate-400 whitespace-pre-line border border-white/10">
            {TERMS_AND_CONDITIONS}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isAuthenticated}
          className="w-full electric-gradient hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-purple-electric/25 disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
