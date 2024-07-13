import { connectToDatabase } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/Task";


export async function GET(){
    connectToDatabase()
    const tasks = await Task.find()
    return NextResponse.json(tasks)
}

export async function POST(request){
    try {
        const data = await request.json() //recibir informacion del cliente
        const newTask = new Task(data) //crear objeto de tareas
        const savedTask = await newTask.save() //guardar en la db
        return NextResponse.json(savedTask)
    }catch(error){
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}