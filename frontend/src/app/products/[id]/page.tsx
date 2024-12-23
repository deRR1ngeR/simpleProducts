"use client";

import { useState, useEffect, use } from "react";
import ProductEditForm from "@/components/ProductEditForm";
import { Product } from "@/types/product";
import { fetcher } from "@/utils/api";

type Params = Promise<{ rcdId: string }>;

export default function ProductPage(props: { params: Params }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = use(props.params);
  const rcdId = params.rcdId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetcher(`/products/${rcdId}`);

        setProduct(response);
      } catch (err: any) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleUpdate = async (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>

      <div className="mb-6 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="mb-1">
          <strong>Description:</strong> {product.description}
        </p>
        <p className="mb-1">
          <strong>Price:</strong> ${product.price}
        </p>
        {product.discountPrice && (
          <p className="mb-1">
            <strong>Discounted Price:</strong> ${product.discountPrice}
          </p>
        )}
        <p className="mb-1">
          <strong>SKU:</strong> {product.sku}
        </p>
        {product.photo && (
          <img
            src={product.photo}
            alt={product.name}
            className="mt-4 max-w-sm rounded-md"
          />
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <ProductEditForm product={product} onUpdate={handleUpdate} />
    </div>
  );
}
