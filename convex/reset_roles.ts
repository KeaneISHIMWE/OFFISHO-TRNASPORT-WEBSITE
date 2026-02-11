import { mutation } from "./_generated/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const resetRoles = mutation({
    args: {},
    handler: async (ctx) => {
        // 1. Demote nelly@gmail.com
        const nelly = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", "nelly@gmail.com"))
            .unique();

        if (nelly) {
            await ctx.db.patch(nelly._id, { role: "user" });
        }

        // 2. Setup admin@offisho.com
        const adminEmail = "admin@offisho.com";
        const adminPassword = "admin123"; // Note: In a real app, this should be hashed, but Convex Auth handles hashing via the provider/actions. 
        // However, I cannot easily hash the password here without the proper machinery. 
        // BUT, wait, I cannot directly set the password in the `users` table because `convex-auth` stores passwords in `authAccounts` or similar, linked to the user.

        // Actually, creating a user and setting a password directly via DB patch is tricky with convex-auth because of hashing/salting.
        // The best way effectively is to just set the role if the user exists. 
        // If the user DOES NOT exist, I cannot easily create them with a password without calling the `signUp` action/machinery which is not available in a mutation.

        // PLAN B: I will check if admin@offisho.com exists. 
        // If yes -> promote to admin.
        // If no -> I will report back that I cannot create the account with a password from here and the user needs to sign up first.

        const adminUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", adminEmail))
            .unique();

        if (adminUser) {
            await ctx.db.patch(adminUser._id, { role: "admin" });
            return `Demoted Nelly. Promoted existing user ${adminEmail} to admin.`;
        } else {
            return `Demoted Nelly. User ${adminEmail} does not exist. Please sign up with this email first, then run this again to promote them.`;
        }
    },
});
