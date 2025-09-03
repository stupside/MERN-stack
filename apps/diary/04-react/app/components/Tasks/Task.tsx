import type { FC } from "react";

export type TaskType = {
    id: string
    date: string
    title: string
    remind: boolean
    description: string
}

const Task: FC<{
    task: Omit<TaskType, "id">,
    onDelete: () => Promise<void>
    onRemind: () => Promise<void>
}> = ({ task, onDelete, onRemind }) => {
    const { date, title, description } = task;
    return (
        <div className={`border p-4 mb-4 rounded flex items-start ${task.remind ? "bg-yellow-100" : ""}`}>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-700">{description}</p>
                <small className="text-gray-500">{date}</small>
            </div>
            <div className="ml-4">
                <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                    onClick={onDelete}
                >
                    Delete
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer ml-2"
                    onClick={onRemind}
                >
                    {task.remind ? "Unremind" : "Remind"}
                </button>
            </div>
        </div>
    );
}

export default Task;
