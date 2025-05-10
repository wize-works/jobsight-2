import Image from "next/image";
import Link from "next/link";
import { getTaskStatusMeta, getTaskPriorityMeta } from "@/lib/enums";
import { format, formatDistanceToNow } from "date-fns";

export const Card = async ({ task }) => {
    const status = getTaskStatusMeta(task.status);
    const priority = getTaskPriorityMeta(task.priority);

    return (
        <div className="card bg-base-100 shadow-lg relative" >
            <div className="absolute top-2 right-2 flex gap-2">
                <span className={`badge ${status.badge}`}>
                    {status.label}
                </span>
                <span className={`badge ${priority.badge}`}>
                    {priority.label}
                </span>
            </div>
            <div className="card-body pt-10">
                <h2 className="text-lg line-clamp-2 font-semibold">
                    <Link href={`/tasks/${task._id}`} className="hover:text-primary">{task.title}</Link>
                </h2>
                <p className="mt-2 line-clamp-3">{task.description || "No description provided"}</p>
                <div className="flex items-center flex-wrap gap-y-2 mt-2">
                    <div className="w-full flex items-start">
                        <i className="far fa-building mr-2 mt-1"></i>
                        <Link href={`/projects/${task.projectId}`} className="hover:text-primary line-clamp-1">
                            {task.projectName || "Unknown project"}
                        </Link>
                    </div>
                    {task.dueDate && (
                        <div className="w-full flex items-center">
                            <i className="far fa-calendar mr-2"></i>
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                    )}
                    {task.assignedToName && (
                        <div className="w-full flex items-center">
                            <i className="far fa-user mr-2"></i>
                            <span>{task.assignedToName}</span>
                        </div>
                    )}
                </div>

                {task.subtasks && task.subtasks.length > 0 && (
                    <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold">Subtasks</span>
                            <span className="text-xs">
                                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                            </span>
                        </div>
                        <progress
                            className="progress"
                            value={task.subtasks.filter(st => st.completed).length}
                            max={task.subtasks.length}
                        ></progress>
                    </div>
                )}

                {task.tags && task.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {task.tags.slice(0, 3).map((tag, idx) => (
                            <div key={idx} className="badge badge-outline badge-sm">{tag}</div>
                        ))}
                        {task.tags.length > 3 && (
                            <div className="badge badge-outline badge-sm">+{task.tags.length - 3}</div>
                        )}
                    </div>
                )}
            </div>
            <div className="flex-none card-body rounded-b-lg bg-base-200/50 border-t-1 border-base-300 flex flex-row justify-between items-center p-3 text-xs">
                <div className="flex items-center space-x-2">
                    <i className="far fa-clock mr-2"></i>
                    <span>{task.createdAt ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true }) : "Unknown"}</span>
                </div>
                {task.isCritical && (
                    <div className="badge badge-error badge-sm">Critical</div>
                )}
            </div>
        </div>
    );
};

export default Card;