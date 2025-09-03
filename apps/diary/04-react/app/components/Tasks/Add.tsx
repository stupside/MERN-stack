import { type FC, useState, type FormEvent } from "react";
import type { TaskType } from "./Task";

const AddTask: FC<{
    onAdd: (task: Omit<TaskType, "id" | "remind">) => Promise<void>
}> = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title || !description || !date) {
            return alert("Please fill in all fields");
        }

        await onAdd({ title, description, date });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="New task title"
                className="border p-2 rounded mr-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="New task description"
                className="border p-2 rounded mr-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                className="border p-2 rounded mr-2"
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : null)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Add Task
            </button>
        </form>
    );
};

export default AddTask;
