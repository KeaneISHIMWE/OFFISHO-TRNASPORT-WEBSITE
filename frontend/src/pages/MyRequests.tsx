import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../context/AuthContextConvex';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Car as CarIcon, CheckCircle2, XCircle, AlertCircle, FileText, CreditCard } from 'lucide-react';
import { cn } from '../utils/cn';

const MyRequests: React.FC = () => {
    const { user } = useAuth();
    const requestsData = useQuery(api.requests.listByUser);
    const requests = requestsData?.requests || [];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <CheckCircle2 className="w-5 h-5 text-green-400" />;
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-400" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-400" />;
            case 'completed':
                return <CheckCircle2 className="w-5 h-5 text-blue-400" />;
            default:
                return <AlertCircle className="w-5 h-5 text-slate-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'rejected':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'completed':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Please log in to view your requests</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">
                        My <span className="text-primary">Requests</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Track the status of your car rental and purchase requests.
                    </p>
                </motion.div>

                {requests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-card p-12 rounded-2xl border border-white/10 text-center"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">No requests yet</h2>
                        <p className="text-slate-400 mb-8">You haven't made any booking or purchase requests yet.</p>
                        <a
                            href="/cars"
                            className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-bold transition-all"
                        >
                            Browse Cars
                        </a>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map((request, index) => (
                            <motion.div
                                key={request._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={request.car_image || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'}
                                        alt={request.car_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 backdrop-blur-md",
                                            getStatusColor(request.status)
                                        )}>
                                            {getStatusIcon(request.status)}
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{request.car_name}</h3>
                                            <p className="text-slate-400 text-sm">{request.car_model}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded tracking-wider">
                                            {request.request_type}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-slate-400 text-sm gap-2">
                                            <Calendar className="w-4 h-4 text-primary" />
                                            <span>{request.event_date || 'N/A'}</span>
                                        </div>
                                        {request.event_type && (
                                            <div className="flex items-center text-slate-400 text-sm gap-2">
                                                <CarIcon className="w-4 h-4 text-primary" />
                                                <span>{request.event_type}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className="text-slate-500 text-xs">Total Amount</span>
                                        <span className="text-primary font-bold">{request.total_amount?.toLocaleString()} FRW</span>
                                    </div>

                                    {(request.status === 'pending' || request.status === 'approved') && (
                                        <Link
                                            to={`/payment?amount=${request.total_amount}&requestId=${request._id}`}
                                            className="mt-4 w-full bg-gradient-to-r from-primary to-purple-electric hover:from-primary/90 hover:to-purple-electric/90 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:scale-[1.02]"
                                        >
                                            <CreditCard className="w-4 h-4" />
                                            Pay Now
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRequests;
