import { ActionCtx, QueryCtx, MutationCtx } from "../_generated/server";
import { auth } from "../auth";
import { Doc, Id } from "../_generated/dataModel";

type AnyCtx = QueryCtx | MutationCtx | ActionCtx;
type DataCtx = QueryCtx | MutationCtx;

export async function getViewerId(ctx: AnyCtx): Promise<Id<"users"> | null> {
    return await auth.getUserId(ctx);
}

export async function getViewer(ctx: DataCtx): Promise<Doc<"users"> | null> {
    const userId = await getViewerId(ctx);
    if (userId === null) return null;
    return await ctx.db.get(userId);
}

export async function requireAuthId(ctx: AnyCtx): Promise<Id<"users">> {
    const userId = await getViewerId(ctx);
    if (userId === null) throw new Error("Authentication required");
    return userId;
}

export async function requireAuth(ctx: DataCtx): Promise<Doc<"users">> {
    const user = await getViewer(ctx);
    if (user === null) throw new Error("Authentication required");
    return user;
}

export async function requireAdmin(ctx: DataCtx): Promise<Doc<"users">> {
    const user = await requireAuth(ctx);
    if (user.role !== "admin") throw new Error("Admin privileges required");
    return user;
}

export async function requireOwnerOrAdmin(ctx: DataCtx, ownerId: Id<"users">): Promise<Doc<"users">> {
    const user = await requireAuth(ctx);
    if (user._id !== ownerId && user.role !== "admin") throw new Error("No permission");
    return user;
}
