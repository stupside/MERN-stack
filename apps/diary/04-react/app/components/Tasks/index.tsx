import type { FC } from "react";
import AddTask from "./Add";
import type { TaskType } from "./Task";
import Task from "./Task";

const Tasks: FC<{
  tasks: TaskType[];
  onDelete: (id: string) => Promise<void>;
  onRemind: (id: string) => Promise<void>;
  onAdd: (task: Omit<TaskType, "id">) => Promise<void>;
}> = ({ tasks, onDelete, onRemind, onAdd }) => {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <div className="mb-4">
          <AddTask
            onAdd={async (task) => {
              await onAdd({
                ...task,
                remind: false,
              });
            }}
          />
        </div>
      </div>
      <ul>
        {tasks.length ? (
          tasks.map((task) => (
            <li key={task.id}>
              <Task
                task={task}
                onDelete={async () => {
                  await onDelete(task.id);
                }}
                onRemind={async () => {
                  await onRemind(task.id);
                }}
              />
            </li>
          ))
        ) : (
          <li className="text-gray-500">No tasks available</li>
        )}
      </ul>
    </>
  );
};

export default Tasks;
