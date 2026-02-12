import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { motion } from 'framer-motion';
import { CreditCard, Phone, Smartphone, AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cn } from '../utils/cn';

const PaymentPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState(searchParams.get('amount') || '');
    const [loading, setLoading] = useState(false);
    const [txRef, setTxRef] = useState<string | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'successful' | 'failed' | null>(null);

    const requestPayment = useMutation(api.payments.requestPayment);
    const paymentDetails = useQuery(api.payments.getPaymentDetails, txRef ? { tx_ref: txRef } : "skip");
    const { showNotification } = useNotification();

    const requestId = searchParams.get('requestId');

    // Watch for payment details and redirect to Flutterwave URL
    useEffect(() => {
        if (paymentDetails) {
            setPaymentStatus(paymentDetails.status as any);

            // If we have a payment URL and status is still pending, redirect to Flutterwave
            if (paymentDetails.paymentUrl && paymentDetails.status === 'pending') {
                showNotification('Redirecting to payment gateway...', 'info');
                // Small delay to show the notification
                setTimeout(() => {
                    window.location.href = paymentDetails.paymentUrl!;
                }, 1000);
            } else if (paymentDetails.status === 'successful') {
                showNotification('Payment successful!', 'success');
            } else if (paymentDetails.status === 'failed') {
                showNotification('Payment failed. Please try again.', 'error');
            }
        }
    }, [paymentDetails, showNotification]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || !amount) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        try {
            setLoading(true);
            setPaymentStatus('pending');

            const result = await requestPayment({
                amount: parseFloat(amount),
                phoneNumber,
                requestId: requestId as any,
            });

            setTxRef(result.tx_ref);
            showNotification('Initializing payment...', 'info');

        } catch (error: any) {
            console.error('Payment error:', error);
            showNotification(error.message || 'Failed to initialize payment', 'error');
            setPaymentStatus('failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-20 px-4">
            <div className="max-w-md mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-purple-card rounded-2xl border border-purple-electric/20 p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Glassmorphism Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-electric/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-purple-electric/20 rounded-xl flex items-center justify-center text-purple-electric">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Mobile Money</h1>
                                <p className="text-slate-400 text-sm">MTN MoMo Rwanda</p>
                            </div>
                        </div>

                        {paymentStatus === 'successful' ? (
                            <div className="text-center py-8">
                                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-white mb-2">Payment Complete!</h2>
                                <p className="text-slate-400 mb-6">Your transaction was successful.</p>
                                <button
                                    onClick={() => navigate('/my-requests')}
                                    className="w-full bg-gradient-to-r from-primary to-purple-electric hover:from-primary/90 hover:to-purple-electric/90 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                                >
                                    View My Requests
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handlePayment} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="e.g. 250780000000"
                                            className="w-full bg-background border border-purple-electric/20 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-electric/50 focus:border-purple-electric transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Amount (RWF)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">FRW</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-background border border-purple-electric/20 rounded-xl py-3 pl-14 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-electric/50 focus:border-purple-electric transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {paymentStatus === 'pending' && txRef && (
                                    <div className="bg-purple-electric/10 border border-purple-electric/20 rounded-xl p-4 flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 text-purple-electric animate-spin" />
                                        <p className="text-sm text-purple-electric">Awaiting payment confirmation...</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || paymentStatus === 'pending'}
                                    className={cn(
                                        "w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg",
                                        loading || paymentStatus === 'pending'
                                            ? "bg-slate-700 cursor-not-allowed"
                                            : "bg-gradient-to-r from-primary to-purple-electric hover:from-primary/90 hover:to-purple-electric/90 transform hover:scale-[1.02] shadow-primary/20"
                                    )}
                                >
                                    {loading ? "Initializing..." : paymentStatus === 'pending' ? "Validating..." : "Pay Now"}
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Securely processed by Flutterwave</span>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PaymentPage;
