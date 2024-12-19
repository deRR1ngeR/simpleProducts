"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { fetcher } from "@/utils/api";

interface ProductEditFormProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

export default function ProductEditForm({
  product,
  onUpdate,
}: ProductEditFormProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    discountPrice: product.discountPrice,
    sku: product.sku,
    photo: product.photo,
  });

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      photo,
    }));
  };

  async function uploadImages(e: any) {
    try {
      setLoading(true);
      if (e.target.files) {
        const fd = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
          fd.append(`file`, e.target.files[i]);
        }
        await fetcher("/upload", { method: "POST", body: fd }).then((res) =>
          setPhoto(res[0])
        );
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetcher(`/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, photo }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the product");
      }

      const updatedProduct = await response.json();
      onUpdate({ ...updatedProduct, photo });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-md shadow-md"
    >
      <div className="mb-4">
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Discounted Price</label>
        <input
          type="number"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">SKU</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Image URL</label>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg"
          onChange={uploadImages}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
