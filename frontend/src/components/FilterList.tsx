"use client";

import { useState, useEffect } from "react";

interface FilterListProps {
  onFilter: (filters: FilterCriteria & { page: number }) => void;
}

interface FilterCriteria {
  name: string;
  price: number | null;
  discountPrice: number | null;
  sku: string;
  sortByPrice: "asc" | "desc" | null;
}

export default function FilterList({ onFilter }: FilterListProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    name: "",
    price: null,
    discountPrice: null,
    sku: "",
    sortByPrice: null,
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter({ ...filters, page });
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "sortByPrice") {
      setFilters((prev) => ({
        ...prev,
        sortByPrice: checked ? "asc" : null,
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || null : value,
    }));
  };

  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortByPrice: prev.sortByPrice === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="name">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={filters.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={filters.price || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter price"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="discountPrice">
          Discounted Price
        </label>
        <input
          type="number"
          id="discountPrice"
          name="discountPrice"
          value={filters.discountPrice || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter discounted price"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="sku">
          SKU
        </label>
        <input
          type="text"
          id="sku"
          name="sku"
          value={filters.sku}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter SKU"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="sortByPrice"
          name="sortByPrice"
          checked={filters.sortByPrice !== null}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="sortByPrice" className="font-medium">
          Sort by Price (
          {filters.sortByPrice === "desc" ? "Descending" : "Ascending"})
        </label>
        {filters.sortByPrice && (
          <button
            onClick={toggleSortOrder}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Toggle Order
          </button>
        )}
      </div>

      {/* Пагинация */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="self-center">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
