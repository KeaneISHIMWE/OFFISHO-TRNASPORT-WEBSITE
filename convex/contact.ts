import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { requireAdmin } from "./lib/auth";

/**
 * Contact Form Mutations and Queries
 */

export const submit = mutation({
    args: {
        fullName: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        const contactId = await ctx.db.insert("contacts", {
            ...args,
            status: "new",
        });

        // Trigger email notification
        await ctx.scheduler.runAfter(0, api.actions.email.sendContactEmail, {
            name: args.fullName,
            email: args.email,
            message: args.message,
        });

        return {
            message: "Message sent successfully",
            contactId,
        };
    },
});

export const list = query({
    args: {},
    handler: async (ctx) => {
        await requireAdmin(ctx);
        return await ctx.db.query("contacts").order("desc").collect();
    },
});

export const updateStatus = mutation({
    args: {
        id: v.id("contacts"),
        status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        await ctx.db.patch(args.id, { status: args.status });
        return { message: "Status updated" };
    },
});
