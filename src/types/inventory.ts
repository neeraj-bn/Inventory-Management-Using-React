export enum CategoryType {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Books = "Books",
  Furniture = "Furniture",
  Other="Other"
}

export interface InventoryItem {
  id: string;
  name: string;
  category: CategoryType;
  quantity: number;
  description?: string;
}
