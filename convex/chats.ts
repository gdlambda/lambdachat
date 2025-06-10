import { query, mutation } from "@/convex/_generated/server";
import { v } from "convex/values";

// Create a new chat
export const createChat = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chats", {
      name: args.name,
    });
    return chatId;
  },
});

// Get all chats
export const getAllChats = query({
  handler: async (ctx) => {
    return await ctx.db.query("chats").collect();
  },
});

// Get a specific chat by ID
export const getChatById = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.chatId);
  },
});

// Update chat name
export const updateChatName = mutation({
  args: {
    chatId: v.id("chats"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.chatId, {
      name: args.name,
    });
  },
});

// Delete a chat
export const deleteChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.chatId);
  },
});
