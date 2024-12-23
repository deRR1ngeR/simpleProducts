"use client";

import { fetcher } from "@/utils/api";
import { useState } from "react";

interface Props {
  onSubmit: (data: any) => void;
}

export default function ProductForm({ onSubmit }: Props) {
  const [photo, setPhoto] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    sku: "",
    photo: "",
  });

  async function uploadImages(e: any) {
    try {
      if (e.target.files) {
        const fd = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
          fd.append(`file`, e.target.files[i]);
        }
        await fetcher("/upload", { method: "POST", body: fd }).then((res) =>
          setPhoto(res[0])
        );
      }
    } catch (err: any) {
      console.error(err);
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Если тип number, преобразуем строку в число или устанавливаем 0 для пустых значений
    const newValue =
      type === "number" && value !== ""
        ? parseFloat(value)
        : type === "number"
        ? 0
        : value;

    setFormData({
      ...formData,
      photo,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправка данных на родительский компонент
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md bg-white p-6 shadow rounded"
    >
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price || ""}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <input
        name="discountPrice"
        type="number"
        placeholder="Discount price"
        value={formData.discountPrice || ""}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg"
        onChange={uploadImages}
      />

      <button
        type="submit"
        className="w-full mt-10 bg-blue-500 text-white py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
