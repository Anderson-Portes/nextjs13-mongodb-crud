"use client";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { ITopic } from "@/types";

const fetchTopics = async (): Promise<ITopic[] | undefined> => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch topics.");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const TopicsList = async () => {
  const topics = await fetchTopics();
  return (
    <>
      {topics?.map((topic) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/topics/${topic._id}/edit`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default TopicsList;
