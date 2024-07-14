import { connectToDatabase } from "@/utils/mongoose";
import Image from "next/image";
import Task from "@/models/Task";
import TaskCard from "@/components/TaskCard"

export const dynamic = "force-dynamic";

async function loadTask() {
  connectToDatabase();
  const tasks = await Task.find();
  return tasks;
}

async function HomePage() {
  const tasks = await loadTask();
  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  );
}
export default HomePage;
