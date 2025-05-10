import { getTaskStatusMeta, getTaskPriorityMeta } from "@/lib/enums";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const Table = async ({ tasks }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-md w-full">
            <table className="table w-full">
                <thead className="bg-base-200/30 text-base-content">
                    <tr>
                        <th>Task</th>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        const status = getTaskStatusMeta(task.status);
                        const priority = getTaskPriorityMeta(task.priority);

                        return (
                            <tr key={task.id} className="hover:bg-base-200/30 transition duration-200 ease-in-out">
                                <td className="flex flex-col">
                                    <div className="font-semibold">
                                        <Link href={`/tasks/${task.id}`} className="hover:text-primary">{task.title}</Link>
                                    </div>
                                    <div className="text-sm text-neutral/60 line-clamp-1">
                                        {task.description || "No description"}
                                    </div>
                                </td>
                                <td>
                                    <Link href={`/projects/${task.projectId}`} className="hover:text-primary">
                                        {task.projectName || "Unknown project"}
                                    </Link>
                                </td>
                                <td><span className={`badge badge-sm ${status.badge}`}>{status.label || "Unknown"}</span></td>
                                <td><span className={`badge badge-sm ${priority.badge}`}>{priority.label || "Normal"}</span></td>
                                <td>{task.assignedToName || "Unassigned"}</td>
                                <td>
                                    {task.dueDate ? (
                                        <div className="flex flex-col">
                                            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                            <span className="text-xs text-neutral/60">
                                                {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-neutral/60">Not set</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;