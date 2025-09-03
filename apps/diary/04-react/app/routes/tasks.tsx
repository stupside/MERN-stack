import type { Route } from "./+types/tasks";

import { useState, type FC } from "react";
import type { TaskType } from "~/components/Tasks/Task";
import Tasks from "~/components/Tasks";

export const loader = async (_: Route.LoaderArgs) => {
  const tasks = await fetch("http://localhost:5000/tasks").then((res) => res.json());
  return { tasks: tasks as TaskType[] };
}

export const meta = (_: Route.MetaArgs) => {
  return [
    { title: "Task List" },
    { name: "description", content: "A list of tasks" },
  ];
}

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {

  const [tasks, setTasks] = useState<TaskType[]>(loaderData.tasks);

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const getTask = async (id: string) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const task = await response.json();
    return task as TaskType;
  };

  const remindTask = async (id: string) => {

    const task = await getTask(id);
    if (!task) return;

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ remind: !task.remind }),
    });

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

  return <>
    <h1>Welcome to the Home Page</h1>
    <Tasks tasks={tasks} onDelete={deleteTask} onRemind={remindTask} onAdd={addTask} />
  </>;
}

export default Page;