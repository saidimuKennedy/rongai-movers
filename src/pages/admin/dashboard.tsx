import useRequireAuth from '@/hooks/useRequiredAuth';
import { Role } from '@prisma/client';
import React from 'react';

function AdminDashboard() {

  useRequireAuth(Role.ADMIN);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>This is the admin dashboard. Content for administrators will go here.</p>
    </div>
  );
}

export default AdminDashboard;