"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo } from "react";

export type MessageItemProps = {
  message: string;
  sender: string;
};

const MarkdownComponents = {
  // Headers
  h1: ({ ...props }) => (
    <h1 className="text-lg font-bold mt-2 mb-1" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-base font-semibold mt-2 mb-1" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-sm font-semibold mt-1 mb-1" {...props} />
  ),
  // Paragraphs
  p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
  // Code blocks and inline code
  code: (props: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
    const { inline, children, ...otherProps } = props;
    if (inline) {
      return (
        <code
          className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs font-mono"
          {...otherProps}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className="block bg-gray-800 text-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2"
        {...otherProps}
      >
        {children}
      </code>
    );
  },
  // Pre blocks (for code blocks)
  pre: ({ ...props }) => (
    <pre
      className="bg-gray-800 text-gray-100 p-2 rounded overflow-x-auto mb-2"
      {...props}
    />
  ),
  // Lists
  ul: ({ ...props }) => (
    <ul className="list-disc list-inside mb-2 space-y-1" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />
  ),
  li: ({ ...props }) => <li className="text-sm" {...props} />,
  // Links
  a: ({ ...props }) => (
    <a
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  // Blockquotes
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-3 italic text-gray-600 mb-2"
      {...props}
    />
  ),
  // Tables
  table: ({ ...props }) => (
    <div className="overflow-x-auto mb-2">
      <table className="min-w-full border border-gray-300 text-xs" {...props} />
    </div>
  ),
  thead: ({ ...props }) => <thead className="bg-gray-50" {...props} />,
  th: ({ ...props }) => (
    <th
      className="border border-gray-300 px-2 py-1 text-left font-medium"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td className="border border-gray-300 px-2 py-1" {...props} />
  ),
  // Strong and emphasis
  strong: ({ ...props }) => <strong className="font-semibold" {...props} />,
  em: ({ ...props }) => <em className="italic" {...props} />,
};

const MarkdownContent = memo(({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={MarkdownComponents}
      skipHtml
    >
      {content}
    </ReactMarkdown>
  );
});

MarkdownContent.displayName = "MarkdownContent";

export const MessageItem = ({ message, sender }: MessageItemProps) => {
  const isUser = sender === "You";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] ${isUser ? "ml-12" : "mr-12"}`}
      >
        <div
          className={`rounded-lg p-3 shadow-sm ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          <div
            className={`text-xs font-medium mb-2 flex items-center gap-2 ${
              isUser ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {sender}
          </div>

          {/* Main Content */}
          <div
            className={`text-sm prose prose-sm max-w-none ${
              isUser
                ? "text-white prose-invert prose-headings:text-white prose-p:text-white prose-strong:text-white prose-em:text-white prose-code:text-blue-100 prose-code:bg-blue-600"
                : "text-gray-700"
            }`}
          >
            {isUser ? (
              // For user messages, just show plain text (no markdown parsing needed)
              <div className="whitespace-pre-wrap">{message}</div>
            ) : (
              // For AI messages, parse markdown
              <MarkdownContent content={message} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
