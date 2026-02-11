import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const { auth, signIn, signOut, store } = convexAuth({
    providers: [
        Password({
            profile(params) {
                return {
                    email: params.email as string,
                    name: params.name as string,
                    phone_number: params.phone_number as string,
                    role: "user", // Default role
                };
            },
        }),
    ],
});

/**
 * Get the currently authenticated user
 */
export const getMe = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (userId === null) {
            return null;
        }
        const user = await ctx.db.get(userId);
        return user;
    },
});

/**
 * Get user by ID
 */
export const getUserById = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            return null;
        }
        return {
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
 * Set user role (Admin only action ideally, or first user)
 */
export const setUserRole = mutation({
    args: {
        userId: v.id("users"),
        role: v.union(v.literal("user"), v.literal("admin")),
    },
    handler: async (ctx, args) => {
        // In a real app, you'd check if the caller is an admin
        await ctx.db.patch(args.userId, { role: args.role });
    },
});
