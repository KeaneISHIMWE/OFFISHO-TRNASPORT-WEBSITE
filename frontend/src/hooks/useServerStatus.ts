import { useState } from 'react';

export type ServerStatus = 'online' | 'offline' | 'checking';

export const useServerStatus = () => {
  // Always return online since we are using Convex backend which manages its own connection state.
  // This prevents the "Server Offline" message caused by failing checks to localhost:5000.
  return {
    status: 'online' as ServerStatus,
    lastChecked: new Date(),
    checkServerStatus: async () => { },
  };
};
