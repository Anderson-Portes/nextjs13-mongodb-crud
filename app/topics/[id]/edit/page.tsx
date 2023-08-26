"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

const fetchTopic = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch topic.");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const EditTopic = ({ params }: any) => {
  const { id } = params;
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "" });
  useEffect(() => {
    fetchTopic(id).then(({ title, description }) => {
      setForm({ title, description });
    });
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
      if (response.ok) {
        return router.push("/");
      }
      throw new Error("Failed to update topic.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        className="border border-slate-500p px-4 py-2"
        placeholder="Topic Title"
        onChange={handleChange}
        value={form.title}
      />
      <textarea
        className="border border-slate-500p px-4 py-2 h-40"
        placeholder="Topic Description"
        name="description"
        onChange={handleChange}
        value={form.description}
      ></textarea>
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Save Topic
      </button>
    </form>
  );
};
export default EditTopic;
