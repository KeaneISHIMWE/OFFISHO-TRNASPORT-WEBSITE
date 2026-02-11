"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary Upload Action
 * Handles image uploads to Cloudinary from the client
 */

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * Note: In production, you should upload directly from client to Cloudinary
 * This action is for server-side uploads if needed
 */
export const uploadImage = action({
    args: {
        imageData: v.string(), // Base64 encoded image data
        folder: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        try {
            const result = await cloudinary.uploader.upload(args.imageData, {
                folder: args.folder || "offisho-transport",
                resource_type: "auto",
            });

            return {
                url: result.secure_url,
                publicId: result.public_id,
            };
        } catch (error: any) {
            console.error("❌ Cloudinary upload error:", error);
            throw new Error("Failed to upload image: " + error.message);
        }
    },
});

/**
 * Delete image from Cloudinary
 */
export const deleteImage = action({
    args: {
        publicId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            await cloudinary.uploader.destroy(args.publicId);
            return { message: "Image deleted successfully" };
        } catch (error: any) {
            console.error("❌ Cloudinary delete error:", error);
            throw new Error("Failed to delete image: " + error.message);
        }
    },
});

/**
 * Generate upload signature for client-side uploads
 * This is the recommended approach for production
 */
export const getUploadSignature = action({
    args: {
        folder: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const params = {
            timestamp,
            folder: args.folder || "offisho-transport",
        };

        const signature = cloudinary.utils.api_sign_request(
            params,
            process.env.CLOUDINARY_API_SECRET!
        );

        return {
            signature,
            timestamp,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder: params.folder,
        };
    },
});
