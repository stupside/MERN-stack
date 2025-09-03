import Header from "~/components/Header";

import type { Route } from "./+types/home";

import Footer from "~/components/Footer";
import { useState } from "react";
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
    {
      id: "1",
      remind: false,
      date: new Date("2023-03-01"),
      title: "Task 1",
      description: "Description for Task 1"
    },
    {
      id: "2",
      remind: true,
      date: new Date("2023-03-02"),
      title: "Task 2",
      description: "Description for Task 2"
    }
  ]);

  const deleteTask = async (id: string) => {
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
    const newTask = { ...task, id: Date.now().toString() };
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
