import React, { useState } from 'react';
import { CategoryType } from '../types/inventory';

interface FilterSortProps {
  onFilterChange: (filter: CategoryType | null) => void;
  onSortChange: (sort: 'quantity' | 'name') => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ onFilterChange, onSortChange }) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  return (
    <div className="flex space-x-4">
      <div className="relative">
        <button
          id="filterDropdownButton"
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Filter Category
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        {filterDropdownOpen && (
          <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="filterDropdownButton">
              <li>
                <button 
                  onClick={() => {
                    onFilterChange(null);
                    setFilterDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  All Categories
                </button>
              </li>
              {Object.values(CategoryType).map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => {
                      onFilterChange(cat);
                      setFilterDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          id="sortDropdownButton"
          onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Sort By
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        {sortDropdownOpen && (
          <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="sortDropdownButton">
              <li>
                <button 
                  onClick={() => {
                    onSortChange('quantity');
                    setSortDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Quantity
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSortChange('name');
                    setSortDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Name
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSort;