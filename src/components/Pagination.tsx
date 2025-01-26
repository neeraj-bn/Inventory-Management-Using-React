import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <button 
            onClick={() => onPageChange(i)}
            className={`
              flex items-center justify-center 
              px-3 h-8 
              leading-tight 
              ${currentPage === i 
                ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100' 
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100'}
            `}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation" className="flex justify-center mt-4">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="
              flex items-center justify-center 
              px-3 h-8 ms-0 
              leading-tight 
              text-gray-500 
              bg-white 
              border border-e-0 border-gray-300 
              rounded-s-lg 
              hover:bg-gray-100 
              hover:text-gray-700
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
          >
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="
              flex items-center justify-center 
              px-3 h-8 
              leading-tight 
              text-gray-500 
              bg-white 
              border border-gray-300 
              rounded-e-lg 
              hover:bg-gray-100 
              hover:text-gray-700
              disabled:opacity-50 
              disabled:cursor-not-allowed
            "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;