// src/components/LoadingSkeleton.js
import React from 'react';

const LoadingSkeleton = ({ darkMode }) => {
  return (
    <div className="animate-pulse">
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={`h-32 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          ></div>
        ))}
      </div>
      
      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className={`h-80 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            <div className={`h-10 w-40 mx-6 mt-6 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className="flex items-center justify-center h-64">
              <svg className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      
      {/* Table Skeleton */}
      <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div className="h-12 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`h-16 mx-6 mb-4 rounded ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
          ></div>
        ))}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;