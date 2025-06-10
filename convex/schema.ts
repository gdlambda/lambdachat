import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chats: defineTable({
    name: v.string(),
  }),

  messages: defineTable({
    chatId: v.id("chats"),
    fromUser: v.boolean(),
    content: v.string(),
  }).index("by_chat", ["chatId"]),
});
