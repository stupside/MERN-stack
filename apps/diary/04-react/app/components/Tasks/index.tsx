import type { FC } from "react";
import type { TaskType } from "./Task";
import Task from "./Task";

const Tasks: FC<{
    tasks: TaskType[]
}> = ({ tasks }) => {
    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Task id={task.id} date={task.date} title={task.title} description={task.description} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks;
