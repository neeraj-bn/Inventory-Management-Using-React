import { InventoryItem, CategoryType } from '../types/inventory';

const STORAGE_KEY = 'inventoryItems';

export const initializeLocalStorage = () => {
  const initialData: InventoryItem[] = [
    {
      id: '1',
      name: 'Laptop',
      category: CategoryType.Electronics,
      quantity: 15,
      description: 'High-performance laptop'
    },
    {
      id: '2',
      name: 'Smart TV',
      category: CategoryType.Electronics,
      quantity: 8,
      description: '4K Smart Television'
    },
    {
      id: '3',
      name: 'Leather Jacket',
      category: CategoryType.Clothing,
      quantity: 5,
      description: 'Vintage leather jacket'
    }
  ];

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

export const getInventoryItems = (): InventoryItem[] => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

export const saveInventoryItems = (items: InventoryItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addInventoryItem = (item: InventoryItem) => {
  const items = getInventoryItems();
  items.push(item);
  saveInventoryItems(items);
};

export const updateInventoryItem = (updatedItem: InventoryItem) => {
  const items = getInventoryItems().map(item => 
    item.id === updatedItem.id ? updatedItem : item
  );
  saveInventoryItems(items);
};

export const deleteInventoryItem = (id: string) => {
  const items = getInventoryItems().filter(item => item.id !== id);
  saveInventoryItems(items);
};