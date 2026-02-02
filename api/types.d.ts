// Global type declarations for backend modules
// This file is included globally to prevent TypeScript errors during Vercel build
// These stubs prevent TypeScript from trying to resolve backend dependencies

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
  const config: (options?: { path?: string } & Record<string, any>) => { parsed?: Record<string, string> };
  export default config;
  export = config;
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
  export const v2: {
    uploader: any;
    config: (options: any) => void;
  };
  export = { v2: any };
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

// Fix for Express.Multer namespace errors - declare in both namespaces
declare namespace global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination?: string;
        filename?: string;
        path?: string;
        buffer: Buffer;
      }
    }
  }
}

declare namespace Express {
  namespace Multer {
    interface File {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination?: string;
      filename?: string;
      path?: string;
      buffer: Buffer;
    }
  }
}
