import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CategoryType, InventoryItem } from '../types/inventory';
import * as LocalStorage from '../services/localStorage';
import { v4 as uuidv4 } from 'uuid';

interface InventoryContextType {
  items: InventoryItem[];
  paginatedItems: InventoryItem[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  searchItems: (query: string, category?: CategoryType | null) => InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateItem: (item: InventoryItem) => void;
  deleteItem: (id: string) => void;
  setCurrentPage: (page: number) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Can be adjusted as needed

  useEffect(() => {
    LocalStorage.initializeLocalStorage();
    setItems(LocalStorage.getInventoryItems());
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const searchItems = (query: string, category?: CategoryType | null): InventoryItem[] => {
    return items.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || item.category === category;
      return matchesQuery && matchesCategory;
    });
  };

  const addItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = { ...item, id: uuidv4() };
    LocalStorage.addInventoryItem(newItem);
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    
    // Adjust current page if needed
    const newTotalPages = Math.ceil(updatedItems.length / itemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  const updateItem = (updatedItem: InventoryItem) => {
    LocalStorage.updateInventoryItem(updatedItem);
    setItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const deleteItem = (id: string) => {
    LocalStorage.deleteInventoryItem(id);
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    
    // Adjust current page if needed
    const newTotalPages = Math.ceil(updatedItems.length / itemsPerPage);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <InventoryContext.Provider 
      value={{ 
        items, 
        paginatedItems,
        currentPage,
        itemsPerPage,
        totalPages,
        searchItems, 
        addItem, 
        updateItem, 
        deleteItem,
        setCurrentPage 
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};