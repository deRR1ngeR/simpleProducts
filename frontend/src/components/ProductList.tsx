"use client";

import { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          className="p-4 bg-white shadow rounded cursor-pointer hover:bg-gray-100"
        >
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="mb-2">{product.description}</p>
          <p className="text-green-500 font-semibold">
            Price: ${product.price}
          </p>
        </Link>
      ))}
    </ul>
  );
}
