import { getTaskStatusMeta, getTaskPriorityMeta } from "@/lib/enums";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export const TaskOverview = async ({ task }) => {
    const { title, description, status, priority, projectId, projectName, estimatedHours, actualHours, dueDate, isCritical, createdAt, updatedAt } = task;
    const statusMeta = getTaskStatusMeta(status);
    const priorityMeta = getTaskPriorityMeta(priority);

    return (
        <div className="card w-full bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
                <div className="flex flex-wrap justify-between items-center">
                    <h2 className="card-title text-2xl">{title}</h2>
                    <div className="flex gap-2">
                        <span className={`badge ${statusMeta.badge}`}>{statusMeta.label}</span>
                        <span className={`badge ${priorityMeta.badge}`}>{priorityMeta.label}</span>
                        {isCritical && <span className="badge badge-error">Critical</span>}
                    </div>
                </div>

                <p className="mt-4">{description || "No description provided"}</p>

                <hr className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-lg">Project</h4>
                        <p>
                            {projectName ? (
                                <Link href={`/projects/${projectId}`} className="text-primary hover:underline">
                                    {projectName} <i className="far fa-up-right-from-square ml-1"></i>
                                </Link>
                            ) : "Not assigned to a project"}
                        </p>

                        <h4 className="font-semibold text-lg mt-4">Assigned To</h4>
                        <p>{task.assignedToName || "Unassigned"}</p>

                        <h4 className="font-semibold text-lg mt-4">Tags</h4>
                        {task.tags && task.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {task.tags.map((tag, idx) => (
                                    <div key={idx} className="badge badge-outline">{tag}</div>
                                ))}
                            </div>
                        ) : (
                            <p>No tags</p>
                        )}
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg">Due Date</h4>
                        {dueDate ? (
                            <div className="flex flex-col">
                                <p>{new Date(dueDate).toLocaleDateString()}</p>
                                <p className="text-sm text-neutral/70">
                                    {formatDistanceToNow(new Date(dueDate), { addSuffix: true })}
                                </p>
                            </div>
                        ) : (
                            <p>No due date set</p>
                        )}

                        <div className="flex flex-row gap-6 mt-4">
                            <div>
                                <h4 className="font-semibold text-lg">Estimated Hours</h4>
                                <p>{estimatedHours || "Not set"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Actual Hours</h4>
                                <p>{actualHours || "Not set"}</p>
                            </div>
                        </div>

                        <h4 className="font-semibold text-lg mt-4">Created</h4>
                        <p>{createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown"}</p>

                        <h4 className="font-semibold text-lg mt-4">Last Updated</h4>
                        <p>{updatedAt ? new Date(updatedAt).toLocaleDateString() : "Unknown"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskOverview;