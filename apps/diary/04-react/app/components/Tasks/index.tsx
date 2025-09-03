import type { FC } from "react";
import type { TaskType } from "./Task";
import Task from "./Task";

const Tasks: FC<{
    tasks: TaskType[]
    onDelete: (id: string) => Promise<void>
}> = ({ tasks, onDelete }) => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            <ul>
                {tasks.length ? tasks.map((task) => (
                    <li key={task.id}>
                        <Task task={task} onDelete={async () => {
                            await onDelete(task.id);
                        }} />
                    </li>
                )) : (
                    <li className="text-gray-500">No tasks available</li>
                )}
            </ul>
        </>
    );
}

export default Tasks;
