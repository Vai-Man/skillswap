import React from 'react';

export function Forum() {
  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Discussions</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  New Post
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-500">No discussions yet</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h2>
            <div className="space-y-2">
              <p className="text-gray-500">No topics yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}