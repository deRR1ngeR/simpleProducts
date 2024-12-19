"use client";

import { useState } from "react";
import FilterList from "@/components/FilterList";
import { fetcher } from "@/utils/api";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilteredProducts = async (filters: any) => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();

      if (filters.name) query.append("name", filters.name);
      if (filters.price) query.append("price", filters.price.toString());
      if (filters.discountPrice)
        query.append("discountPrice", filters.discountPrice.toString());
      if (filters.sku) query.append("sku", filters.sku);
      if (filters.sortByPrice) query.append("sortByPrice", filters.sortByPrice);
      if (filters.page) {
        query.append("page", filters.page.toString());
      } else query.append("page", "1");
      query.append("limit", "5");

      const response = await fetcher(`/products?${query.toString()}`);

      setProducts(response.products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId: number) => () => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="p-6">
      <FilterList onFilter={fetchFilteredProducts} />
      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="mb-4 p-4 bg-white shadow rounded cursor-pointer"
                onClick={handleProductClick(product.id)}
              >
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Discounted Price: ${product.discountPrice}</p>
                <p>SKU: {product.sku}</p>
                {product.photo && (
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No products match the filters.</p>
        )}
        <button
          className="w-full h-12 bg-blue-500 text-white rounded-xl"
          onClick={() => router.push("/products/manage")}
        >
          {" "}
          add new product
        </button>
      </div>
    </div>
  );
}
