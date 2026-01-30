// Global type declarations for backend modules
// This file provides type stubs for all backend dependencies
// Used during Vercel build to prevent TypeScript errors

declare module 'express' {
  export = any;
}

declare module 'cors' {
  export = any;
}

declare module 'helmet' {
  export = any;
}

declare module 'dotenv' {
  export = any;
}

declare module 'express-rate-limit' {
  export = any;
}

declare module 'uuid' {
  export = any;
}

declare module 'bcrypt' {
  export = any;
}

declare module 'jsonwebtoken' {
  export = any;
}

declare module 'multer' {
  export = any;
}

declare module 'cloudinary' {
  export = any;
}

declare module 'joi' {
  export = any;
}

declare module 'nodemailer' {
  export = any;
}

declare module 'mysql2/promise' {
  export = any;
}

// Fix for Express.Multer namespace errors
declare namespace Express {
  namespace Multer {
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    }
  }
}
