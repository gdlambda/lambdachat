import { query, mutation } from "@/convex/_generated/server";
import { v } from "convex/values";

// Get a chat with all its messages
export const getChatWithMessages = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const chat = await ctx.db.get(args.chatId);
    if (!chat) return null;

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();

    return {
      ...chat,
      messages,
    };
  },
});

// Create a new chat and optionally add an initial message
export const createChatWithMessage = mutation({
  args: {
    name: v.string(),
    initialMessage: v.optional(v.string()),
    fromUser: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chats", {
      name: args.name,
    });

    if (args.initialMessage) {
      await ctx.db.insert("messages", {
        chatId,
        fromUser: args.fromUser ?? true,
        content: args.initialMessage,
      });
    }

    return chatId;
  },
});

// Delete a chat and all its messages
export const deleteChatWithMessages = mutation({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    // First delete all messages
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    // Then delete the chat
    await ctx.db.delete(args.chatId);
  },
});
