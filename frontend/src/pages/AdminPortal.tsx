import React from 'react';
import { ProtectedRoute } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';

const AdminPortal: React.FC = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  );
};

export default AdminPortal;
