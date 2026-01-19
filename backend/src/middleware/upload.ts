import multer from 'multer';
import { Request } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  if (process.env.CLOUDINARY_URL) return true;
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your-cloud-name' &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_KEY !== 'your-api-key' &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_API_SECRET !== 'your-api-secret'
  ) {
    return true;
  }
  return false;
};

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
  try {
    const [_, rest] = process.env.CLOUDINARY_URL.split('://');
    const [creds, cloudName] = rest.split('@');
    const [key, secret] = creds.split(':');

    cloudinary.config({
      cloud_name: cloudName,
      api_key: key,
      api_secret: secret,
    });
  } catch (error) {
    console.warn('Failed to parse CLOUDINARY_URL, falling back to local storage');
  }
} else if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Memory storage for multer
const storage = multer.memoryStorage();

// File filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'));
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Helper function to upload (Cloudinary with local fallback)
export const uploadImage = async (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.buffer) {
      reject(new Error('File buffer not available'));
      return;
    }

    if (isCloudinaryConfigured()) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'offisho-transport',
          transformation: [{ width: 1200, height: 800, crop: 'limit' }],
          public_id: `car-${Date.now()}-${Math.round(Math.random() * 1E9)}`,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            // Fallback to local storage on error
            saveLocally(file).then(resolve).catch(reject);
          } else {
            resolve(result!.secure_url);
          }
        }
      );
      uploadStream.end(file.buffer);
    } else {
      saveLocally(file).then(resolve).catch(reject);
    }
  });
};

const saveLocally = async (file: Express.Multer.File): Promise<string> => {
  const filename = `car-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
  const filepath = path.join(uploadDir, filename);

  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        // Return URL pointing to local server
        const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        resolve(`${baseUrl}/uploads/${filename}`);
      }
    });
  });
};

// Legacy export for backward compatibility
export const uploadToCloudinary = uploadImage;
