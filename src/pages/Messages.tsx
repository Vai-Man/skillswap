import React from 'react';
import { MessageSquare } from 'lucide-react';

export function Messages() {
  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
      </header>

      <div className="bg-white shadow-sm rounded-lg min-h-[500px] flex">
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversations</h2>
            <p className="text-gray-500">No active conversations</p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
            <p className="text-gray-500">Choose a conversation from the list to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  );
}