import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, phone_number?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { signIn, signOut } = useAuthActions();
    const signInQuery = useQuery(api.auth.getMe);
    const user = signInQuery ? ({
        ...signInQuery,
        id: signInQuery._id,
    } as User) : null;
    const navigate = useNavigate();

    const loading = signInQuery === undefined;

    const login = async (email: string, password: string): Promise<void> => {
        await signIn("password", { email, password, flow: "signIn" });
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        phone_number?: string
    ): Promise<void> => {
        await signIn("password", {
            name,
            email,
            password,
            phone_number,
            flow: "signUp"
        });
    };

    const logout = async (): Promise<void> => {
        await signOut();
        navigate('/');
    };

    const value: AuthContextType = {
        user: user || null,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route Component
interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requireAdmin = false,
}) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (requireAdmin && !isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-slate-400">You need admin privileges to access this page.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
