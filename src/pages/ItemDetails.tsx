import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items, deleteItem } = useInventory();
  const navigate = useNavigate();

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Inventory
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(item.id);
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{item.name}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/`)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Item Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Category:</span> {item.category}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>
                <span
                  className={item.quantity < 10 ? "text-red-600 font-bold" : ""}
                >
                  {item.quantity}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">
              {item.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
