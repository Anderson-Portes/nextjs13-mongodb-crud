import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json(
    {
      message: "Topic created successfully.",
    },
    {
      status: 201,
    }
  );
};
export const GET = async () => {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json(topics, { status: 200 });
};
