"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function ManageProductsPage() {
  const router = useRouter();

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);

    await fetch("https://simpleproducts.railway.internal/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button className="absolute left-20 top-5" onClick={() => router.back()}>
        {" "}
        Back
      </button>
      <h2 className="flex mt-5 justify-center text-2xl font-bold mb-4">
        Add Product
      </h2>
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
}
