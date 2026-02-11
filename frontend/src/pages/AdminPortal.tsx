import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const AdminPortal: React.FC = () => {
  // Temporarily no auth protection - open for testing
  return <AdminDashboard />;
};

export default AdminPortal;
