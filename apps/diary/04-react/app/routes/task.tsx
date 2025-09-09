import type { FC } from "react";
import type { TaskType } from "~/components/Tasks/Task";
import type { Route } from "./+types/task";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const response = await fetch(`http://localhost:5000/tasks/${params.id}`);
  const task = await response.json();
  return {
    task: task as TaskType,
  };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  return [
    { title: loaderData.task.title },
    { name: "description", content: loaderData.task.description },
  ];
};

const Page: FC<Route.ComponentProps> = ({ loaderData }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <p className="mt-2">ID: {loaderData.task.id}</p>
      <p className="mt-2">Title: {loaderData.task.title}</p>
      <p className="mt-2">Description: {loaderData.task.description}</p>
      <p className="mt-2">Date: {loaderData.task.date}</p>
      <p className="mt-2">Remind: {loaderData.task.remind ? "Yes" : "No"}</p>
    </div>
  );
};

export default Page;
