import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<User>;
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
    // Temporary: No auth, return mock user for testing
    const user = null;
    const loading = false;

    const login = async (email: string, password: string): Promise<User> => {
        // Temporary mock login
        const mockUser: User = {
            _id: 'mock-user-id' as any,
            name: 'Test User',
            email: email,
            role: 'user',
            phone_number: '+250123456789'
        };
        return mockUser;
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        phone_number?: string
    ): Promise<void> => {
        // Temporary mock registration
        console.log('Mock registration:', { name, email });
    };

    const logout = (): void => {
        window.location.href = '/';
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: false,
        isAdmin: false,
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
    // Temporary: Allow all access for testing
    return <>{children}</>;
};
