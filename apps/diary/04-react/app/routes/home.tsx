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
      date: new Date("2023-03-01"),
      title: "Task 1",
      description: "Description for Task 1"
    },
    {
      id: "2",
      date: new Date("2023-03-02"),
      title: "Task 2",
      description: "Description for Task 2"
    }
  ]);

  return <div className="flex flex-col min-h-screen">
    <Header title="Home" />
    <main className="flex-grow container mx-auto p-4">
      <h1>Welcome to the Home Page</h1>
      <Tasks tasks={tasks} />
    </main>
    <Footer />
  </div>;
}
