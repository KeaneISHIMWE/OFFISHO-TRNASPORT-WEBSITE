// Stub type declarations for backend modules to prevent TypeScript errors
// These are only used during Vercel build - actual modules are available at runtime
// Backend code is included at runtime via includeFiles in vercel.json

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
  const config: (options?: any) => void;
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
  export const v2: any;
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

// Fix for Express.Multer namespace errors
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

// Also declare in Express namespace for compatibility
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
