'use client';

import React from 'react';
import { Message, useChat } from 'ai/react';
import { ToolInvocation } from 'ai';
export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, error, reload, addToolResult, isLoading } = useChat({
    maxSteps: 5,
    async onToolCall({ toolCall }) {
      console.log('Tool called:', toolCall);
      // Let the AI handle the tool calls through the API
      return undefined;
    },
  });

  console.log('Chat Error:', error);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {error && (
        <div className="p-4 bg-red-50 border-b border-red-100 text-red-700">
          Error: {error.message}
          <button 
            onClick={() => reload()}
            className="ml-2 text-red-500 hover:text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m: Message) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              m.role === 'user' 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-wrap">{m.content}</p>
              
              {/* Tool Invocations */}
              {m.toolInvocations?.map((toolInvocation: ToolInvocation) => (
                <div key={toolInvocation.toolCallId} className="mt-2 text-sm border-t border-gray-200 pt-2">
                  {'result' in toolInvocation ? (
                    <div className="text-green-600">
                      {`${toolInvocation.toolName}: ${toolInvocation.result}`}
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Processing {toolInvocation.toolName}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="border-t p-4 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Send a payment instruction... (e.g., 'Send $50 to John')"
            className="flex-1 resize-none rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 