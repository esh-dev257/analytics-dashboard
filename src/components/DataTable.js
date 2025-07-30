// src/components/DataTable.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DataTable = ({ data, total, page, totalPages, onParamsChange, darkMode }) => {
  const [sortField, setSortField] = useState('spend');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const handleSort = (field) => {
    const newOrder = field === sortField && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortOrder(newOrder);
    onParamsChange({ sort: field, order: newOrder });
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onParamsChange({ page: newPage });
    }
  };
  
  return (
    <div className={`rounded-xl overflow-hidden shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Campaign
              </th>
              <th 
                scope="col" 
                className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`}
                onClick={() => handleSort('spend')}
              >
                <div className="flex items-center">
                  <span>Spend</span>
                  {sortField === 'spend' && (
                    <span className="ml-1">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`}
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center">
                  <span>Impressions</span>
                  {sortField === 'impressions' && (
                    <span className="ml-1">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`}
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center">
                  <span>Clicks</span>
                  {sortField === 'clicks' && (
                    <span className="ml-1">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`}
                onClick={() => handleSort('conversions')}
              >
                <div className="flex items-center">
                  <span>Conversions</span>
                  {sortField === 'conversions' && (
                    <span className="ml-1">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider cursor-pointer`}
                onClick={() => handleSort('roi')}
              >
                <div className="flex items-center">
                  <span>ROI</span>
                  {sortField === 'roi' && (
                    <span className="ml-1">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {data.map((campaign, index) => (
              <motion.tr 
                key={campaign.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}
              >
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {campaign.name}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  ${campaign.spend.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {campaign.impressions.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {campaign.clicks.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {campaign.conversions.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.roi >= 3 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : campaign.roi >= 2 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {campaign.roi.toFixed(2)}x
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={`px-6 py-4 flex items-center justify-between border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Showing <span className="font-medium">{(page - 1) * data.length + 1}</span> to <span className="font-medium">{Math.min(page * data.length, total)}</span> of <span className="font-medium">{total}</span> campaigns
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              page === 1 
                ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed` 
                : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show pages around current page
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  page === pageNum 
                    ? `${darkMode ? 'bg-primary-600 text-white' : 'bg-primary-600 text-white'}` 
                    : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              page === totalPages 
                ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed` 
                : `${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;