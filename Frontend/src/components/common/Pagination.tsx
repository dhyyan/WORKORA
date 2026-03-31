import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // If there's only 1 page or none, don't show pagination
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Calculate which page numbers to show - max 5 pages total in view
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-8 mb-4">
            {/* Previous Button */}
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${currentPage === 1
                    ? 'border-gray-200 text-gray-400 bg-white cursor-not-allowed'
                    : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50 hover:text-blue-500'
                    }`}
                aria-label="Previous Page"
            >
                <span className="text-sm font-medium">&lt;</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-2">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors border ${currentPage === page
                                ? 'bg-[#519de9] text-white border-[#519de9]'
                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-blue-500'
                                }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-2 text-gray-400">
                            {page}
                        </span>
                    )
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 bg-white cursor-not-allowed'
                    : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50 hover:text-blue-500'
                    }`}
                aria-label="Next Page"
            >
                <span className="text-sm font-medium">&gt;</span>
            </button>
        </div>
    );
};

export default Pagination;
