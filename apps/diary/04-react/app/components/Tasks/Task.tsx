import type { FC } from "react";

export type TaskType = {
    id: string
    date: Date
    title: string
    description: string
}

const Task: FC<TaskType> = ({ date, title, description }) => {
    return (
        <div className="border p-4 mb-4 rounded">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-700">{description}</p>
            <small className="text-gray-500">{date.toDateString()}</small>
        </div>
    );
}

export default Task;
