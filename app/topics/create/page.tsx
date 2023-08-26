"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CreateTopic = () => {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "" });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (response.ok) {
        return router.push("/");
      }
      throw new Error("Failed to create topic.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="border border-slate-500p px-4 py-2"
        placeholder="Topic Title"
        required
      />
      <textarea
        className="border border-slate-500p px-4 py-2 h-40"
        placeholder="Topic Description"
        name="description"
        onChange={handleChange}
        value={form.description}
        required
      ></textarea>
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Save Topic
      </button>
    </form>
  );
};

export default CreateTopic;
