import { v, ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAuth } from "./lib/auth";
import bcrypt from "bcryptjs";

/**
 * Find user by email - helper for admin promotion
 */
export const findByEmail = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("email", (q) => q.eq("email", args.email))
            .first();

        if (!user) {
            return null;
        }

        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    },
});

/**
 * Update the current user's password
 */
export const updatePassword = mutation({
    args: {
        oldPassword: v.string(),
        newPassword: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await requireAuth(ctx);
        const userId = user._id;

        // Find the password entry for this user in the accounts table
        // convex-dev/auth stores credentials in accounts
        const account = await ctx.db
            .query("accounts")
            .withIndex("userIdAndProvider", (q) => q.eq("userId", userId).eq("provider", "password"))
            .first();

        if (!account || !account.secret) {
            throw new ConvexError("Password account not found. Are you logged in with a password?");
        }

        // Verify old password
        const isValid = await bcrypt.compare(args.oldPassword, account.secret as string);
        if (!isValid) {
            throw new ConvexError("Invalid current password");
        }

        // Hash new password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(args.newPassword, salt);

        // Update the account record
        await ctx.db.patch(account._id, {
            secret: passwordHash,
        });

        return { message: "Password updated successfully" };
    },
});

/**
 * Update the current user's email
 */
export const updateEmail = mutation({
    args: {
        newEmail: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await requireAuth(ctx);
        const userId = user._id;

        // Verify email format basically
        if (!args.newEmail.includes("@")) {
            throw new ConvexError("Invalid email format");
        }

        // Check if new email is already taken
        const existingUser = await ctx.db
            .query("users")
            .withIndex("email", (q) => q.eq("email", args.newEmail))
            .first();

        if (existingUser && existingUser._id !== userId) {
            throw new ConvexError("Email is already in use by another account");
        }

        // Find the password entry to verify identity
        const account = await ctx.db
            .query("accounts")
            .withIndex("userIdAndProvider", (q) => q.eq("userId", userId).eq("provider", "password"))
            .first();

        if (!account || !account.secret) {
            throw new ConvexError("Authentication account not found");
        }

        // Verify password before allowing email change
        const isValid = await bcrypt.compare(args.password, account.secret as string);
        if (!isValid) {
            throw new ConvexError("Invalid password. Identity verification failed.");
        }

        // Update the user profile
        await ctx.db.patch(userId, {
            email: args.newEmail,
        });

        // Update the auth account (providerAccountId is the email for password provider)
        await ctx.db.patch(account._id, {
            providerAccountId: args.newEmail,
        });

        return { message: "Email updated successfully" };
    },
});
