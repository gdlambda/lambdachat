import { query, mutation } from "@/convex/_generated/server";
import { v } from "convex/values";

// Create a new message with reasoning support
export const createMessage = mutation({
  args: {
    chatId: v.id("chats"),
    fromUser: v.boolean(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      fromUser: args.fromUser,
      content: args.content,
    });
    return messageId;
  },
});

// Get all messages for a specific chat
export const getMessagesByChat = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();
  },
});

// Get a specific message by ID
export const getMessageById = query({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.messageId);
  },
});

// Delete a message
export const deleteMessage = mutation({
  args: { messageId: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.messageId);
  },
});

// Delete all messages for a chat (useful when deleting a chat)
export const deleteMessagesByChat = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
  },
});
