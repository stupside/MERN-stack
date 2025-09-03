import type { FC } from "react";
import type { TaskType } from "./Task";
import Task from "./Task";
import AddTask from "./Add";

const Tasks: FC<{
    tasks: TaskType[]
    onDelete: (id: string) => Promise<void>,
    onRemind: (id: string) => Promise<void>,
    onAdd: (task: Omit<TaskType, "id">) => Promise<void>
}> = ({ tasks, onDelete, onRemind, onAdd }) => {
    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">Tasks</h2>
                <AddTask onAdd={async (task) => {
                    await onAdd({
                        ...task,
                        remind: false
                    });
                }} />
            </div>
            <ul>
                {tasks.length ? tasks.map((task) => (
                    <li key={task.id}>
                        <Task task={task}
                            onDelete={async () => {
                                await onDelete(task.id);
                            }}
                            onRemind={async () => {
                                await onRemind(task.id);
                            }}
                        />
                    </li>
                )) : (
                    <li className="text-gray-500">No tasks available</li>
                )}
            </ul>
        </>
    );
}

export default Tasks;
