import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/Topic";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json(topic, { status: 200 });
};

export const PUT = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json(
    {
      message: "Topic updated successfully",
    },
    {
      status: 200,
    }
  );
};

export const DELETE = async (request: NextRequest, { params }: any) => {
  const { id } = params;
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json(
    {
      message: "Topic deleted successfully",
    },
    {
      status: 200,
    }
  );
};
