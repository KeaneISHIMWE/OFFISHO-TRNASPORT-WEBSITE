import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexReactClient } from 'convex/react';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

// Initialize Convex client
// The VITE_CONVEX_URL should be in your .env.local file
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Check if root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConvexAuthProvider client={convex}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ConvexAuthProvider>
  </React.StrictMode>
);
