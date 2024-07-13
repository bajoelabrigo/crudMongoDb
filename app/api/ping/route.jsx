import { connectToDatabase } from "@/utils/mongoose";

const { NextResponse } = require("next/server");


export function GET(){
    connectToDatabase()
    return NextResponse.json({
        message: "hello world"
    })
}