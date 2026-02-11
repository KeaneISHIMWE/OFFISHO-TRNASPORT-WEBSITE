import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/**
 * HTTP Routes for Convex
 * These provide REST-like endpoints if needed for compatibility
 */

// Health check endpoint
http.route({
    path: "/health",
    method: "GET",
    handler: httpAction(async () => {
        return new Response(
            JSON.stringify({ status: "ok", message: "Convex backend is running" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    }),
});

// Contact form endpoint (for direct HTTP calls if needed)
http.route({
    path: "/contact",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        try {
            await ctx.runAction(api.actions.email.sendContactEmail, {
                name,
                email,
                message,
            });

            return new Response(
                JSON.stringify({ message: "Message sent successfully" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } catch (error: any) {
            return new Response(
                JSON.stringify({ error: error.message || "Internal server error" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    }),
});

export default http;
