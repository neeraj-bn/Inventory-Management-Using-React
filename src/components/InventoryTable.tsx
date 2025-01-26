import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import { InventoryItem, CategoryType } from "../types/inventory";
import EditItemModal from "./EditItemModal";
import Pagination from "./Pagination";
import DeleteAlertDialog from "./DeleteAlertDialog";

interface InventoryTableProps {
  filter: CategoryType | null;
  sortBy: "quantity" | "name";
  overrideItems?: InventoryItem[] | null;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  filter,
  sortBy,
  overrideItems,
}) => {
  const { items, deleteItem, currentPage, setCurrentPage } = useInventory();
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);

  // Determine which items to use
  const displayItems = overrideItems ?? items;

  // Filter and sort logic
  const filteredAndSortedItems = displayItems
    .filter((item) => !filter || item.category === filter)
    .sort((a, b) => {
      if (sortBy === "quantity") return a.quantity - b.quantity;
      return a.name.localeCompare(b.name);
    });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const paginatedItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-100">
      {filteredAndSortedItems.length === 0 ? (
        <div className="text-center text-gray-600 py-4 bg-white">
          {overrideItems !== null
            ? "No items found matching your search"
            : "No items in inventory"}
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr
                  key={item.id}
                  className={`
                    bg-white border-b 
                    dark:bg-gray-800 dark:border-gray-700 
                    border-gray-200 
                    ${
                      item.quantity < 10
                        ? "bg-red-100 dark:bg-red-900"
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      to={`/item/${item.id}`}
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </th>
                  <td className="px-6 py-4">{item.category}</td>
                  <td
                    className={`px-6 py-4 
                      ${
                        item.quantity < 10
                          ? "text-red-600 dark:text-red-400 font-bold"
                          : ""
                      }
                    `}
                  >
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-5">
                      <button
                        onClick={() => setEditItem(item)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <DeleteAlertDialog
                        itemName={item.name}
                        onDelete={() => deleteItem(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {editItem && (
        <EditItemModal item={editItem} onClose={() => setEditItem(null)} />
      )}
    </div>
  );
};

export default InventoryTable;
