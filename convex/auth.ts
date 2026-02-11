import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser, requireAuth } from "./lib/auth";
import bcrypt from "bcryptjs";

/**
 * Authentication Queries and Mutations
 */

/**
 * Register a new user
 */
export const register = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        password: v.string(),
        phone_number: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        // Hash password
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(args.password, saltRounds);

        // Create user
        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            phone_number: args.phone_number,
            password_hash,
            role: "user",
        });

        // Get created user
        const user = await ctx.db.get(userId);
        if (!user) {
            throw new Error("Failed to create user");
        }

        return {
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
            },
        };
    },
});

/**
 * Login user
 */
export const login = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        // Find user
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
            args.password,
            user.password_hash
        );

        if (!isValidPassword) {
            throw new Error("Invalid email or password");
        }

        return {
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
            },
        };
    },
});

/**
 * Get current user information
 * Note: This is a simplified version. In production, implement proper session management.
 * For now, this returns null and auth is handled via login/register mutations.
 */
export const getMe = query({
    args: {},
    handler: async (ctx) => {
        // Simplified: return null
        // Auth is handled via login/register mutations
        // Frontend stores user info after successful login
        return { user: null };
    },
});

/**
 * Get user by ID
 * Note: Simplified version without session-based auth checks
 */
export const getUserById = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            throw new Error("User not found");
        }

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                role: user.role,
                created_at: new Date(user._creationTime).toISOString(),
            },
        };
    },
});
