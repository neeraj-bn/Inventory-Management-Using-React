import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { InventoryItem, CategoryType } from '../types/inventory';
import InventoryTable from '../components/InventoryTable';
import AddItemModal from '../components/AddItemModal';
import FilterSort from '../components/FilterSort';
import SearchComponent from '../components/SearchComponent';

const Dashboard: React.FC = () => {
  const { searchItems } = useInventory();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState<CategoryType | null>(null);
  const [sortBy, setSortBy] = useState<'quantity' | 'name'>('quantity');
  const [searchResults, setSearchResults] = useState<InventoryItem[] | null>(null);

  const handleSearch = (query: string, category?: CategoryType | null) => {
    const results = searchItems(query, category);
    setSearchResults(results.length > 0 ? results : []);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <FilterSort 
            onFilterChange={(cat) => {
              setFilter(cat);
              setSearchResults(null);
            }} 
            onSortChange={setSortBy}
          />
          <SearchComponent
            onSearch={handleSearch} 
            currentCategory={filter}
          />
        </div>
        <button type="button" 
          onClick={() => setIsAddModalOpen(true)} 
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Add New Item
        </button>
      </div>

      {searchResults !== null ? (
        <div className="mb-4 text-gray-600">
          Search Results: {searchResults.length} item(s) found
        </div>
      ) : null}

      <InventoryTable 
        filter={filter} 
        sortBy={sortBy}
        overrideItems={searchResults}
      />

      {isAddModalOpen && (
        <AddItemModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;