import { v } from "convex/values";
import { query } from "./_generated/server";

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
            .withIndex("by_email", (q) => q.eq("email", args.email))
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
