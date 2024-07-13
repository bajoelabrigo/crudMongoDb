import { connectToDatabase } from "@/utils/mongoose";
import next from "next";
import { NextResponse } from "next/server";
import Task from "@/models/Task";

export async function GET(request, { params }) {
  try {
    connectToDatabase();
    const taskFound = await Task.findById(params.id);

    if (!taskFound)
      return NextResponse.json(
        {
          message: "Tarea no encontrada",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const tasDeleted = await Task.findByIdAndDelete(params.id)

    if (!tasDeleted) {
      return NextResponse.json(
        {
          message: "Tarea no encontrada",
        },
        {
          status: 404,
        }
      ); // 404 Not Found status code for resource not found.
    }
    return NextResponse.json(tasDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(data);
    const taskUpdate = await Task.findById(params.id, data, {
      new: true,
    });

    return NextResponse.json(taskUpdate);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
