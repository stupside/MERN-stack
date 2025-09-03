import Header from "~/components/Header";

import type { Route } from "./+types/home";

import Footer from "~/components/Footer";
import { useEffect, useState } from "react";
import type { TaskType } from "~/components/Tasks/Task";
import Tasks from "~/components/Tasks";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const [tasks, setTasks] = useState<TaskType[]>([
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json() as TaskType[];
      return data;
    };

    fetchTasks().then(setTasks);
  }, []);

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const remindTask = async (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, remind: !task.remind } : task
      )
    );
  };

  const addTask = async (task: Omit<TaskType, "id">) => {
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return <div className="flex flex-col min-h-screen">
    <Header title="Home" />
    <main className="flex-grow container mx-auto p-4">
      <h1>Welcome to the Home Page</h1>
      <Tasks tasks={tasks} onDelete={deleteTask} onRemind={remindTask} onAdd={addTask} />
    </main>
    <Footer />
  </div>;
}
