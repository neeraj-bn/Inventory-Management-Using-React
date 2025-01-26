import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { CategoryType } from '../types/inventory';

const Reports: React.FC = () => {
  const { items } = useInventory();

  // Calculate total inventory statistics
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = items.filter(item => item.quantity < 10);

  // Calculate category summary
  const categorySummary = Object.values(CategoryType).map(category => {
    const categoryItems = items.filter(item => item.category === category);
    return {
      category,
      totalItems: categoryItems.length,
      totalQuantity: categoryItems.reduce((sum, item) => sum + item.quantity, 0),
      lowStockItems: categoryItems.filter(item => item.quantity < 10).length
    };
  }).filter(summary => summary.totalItems > 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Reports</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Overall Inventory Summary</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Total Items:</span> {totalItems}
            </p>
            <p>
              <span className="font-medium">Total Quantity:</span> {totalQuantity}
            </p>
            <p>
              <span className="font-medium text-red-600">Low Stock Items:</span> {lowStockItems.length}
            </p>
          </div>
        </div>

        {/* Category Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Category Summary</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4">Total Items</th>
                <th className="py-2 px-4">Total Quantity</th>
                <th className="py-2 px-4">Low Stock</th>
              </tr>
            </thead>
            <tbody>
              {categorySummary.map(summary => (
                <tr key={summary.category} className="border-b">
                  <td className="py-2 px-4">{summary.category}</td>
                  <td className="py-2 px-4 text-center">{summary.totalItems}</td>
                  <td className="py-2 px-4 text-center">{summary.totalQuantity}</td>
                  <td className="py-2 px-4 text-center text-red-600">
                    {summary.lowStockItems}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;