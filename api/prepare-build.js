// Script to prepare API build by ensuring backend dependencies are available
const fs = require('fs');
const path = require('path');

// Backend node_modules path
const backendNodeModules = path.join(__dirname, '../backend/node_modules');
const apiNodeModules = path.join(__dirname, 'node_modules');

// Check if backend node_modules exists
if (fs.existsSync(backendNodeModules)) {
  console.log('Backend node_modules found');
  
  // Create symlink or ensure dependencies are accessible
  // Vercel will resolve modules from backend/node_modules during build
  process.env.NODE_PATH = process.env.NODE_PATH 
    ? `${process.env.NODE_PATH}:${backendNodeModules}`
    : backendNodeModules;
    
  console.log('NODE_PATH set to include backend node_modules');
} else {
  console.log('Warning: Backend node_modules not found');
}
