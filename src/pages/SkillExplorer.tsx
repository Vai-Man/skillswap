import React from 'react';

export function SkillExplorer() {
  return (
    <div className="space-y-6">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Explore Skills</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Skills</h2>
            <p className="text-gray-500">No skills available</p>
          </div>
        </div>

        <div>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option>All Categories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Skill Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  <option>All Types</option>
                  <option>Offering</option>
                  <option>Seeking</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}