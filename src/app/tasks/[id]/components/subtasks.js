'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export const TaskSubtasks = ({ task }) => {
    const router = useRouter();
    const [subtasks, setSubtasks] = useState(task.subtasks || []);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggleSubtask = async (index, completed) => {
        try {
            setIsUpdating(true);

            // Update optimistically
            const newSubtasks = [...subtasks];
            newSubtasks[index].completed = completed;
            setSubtasks(newSubtasks);

            // Construct GraphQL mutation
            const query = `
                mutation ($id: ID!, $input: TaskInput!) {
                    updateTask(id: $id, input: $input) {
                        _id
                        subtasks {
                            title
                            completed
                        }
                    }
                }
            `;

            // Send to server via API route
            const response = await fetch('/api/wize-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        id: task.id,
                        input: {
                            subtasks: newSubtasks
                        }
                    }
                }),
            });

            const result = await response.json();

            if (!response.ok || result.errors) {
                throw new Error(result.errors?.[0]?.message || 'Failed to update subtask');
            }

            // Refresh the page data
            router.refresh();
        } catch (error) {
            console.error("Failed to toggle subtask:", error);
            // Revert on error
            const newSubtasks = [...subtasks];
            newSubtasks[index].completed = !completed;
            setSubtasks(newSubtasks);
        } finally {
            setIsUpdating(false);
        }
    };

    // Calculate completion percentage
    const completedCount = subtasks.filter(subtask => subtask.completed).length;
    const totalCount = subtasks.length;
    const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">Subtasks</h2>
                    {totalCount > 0 && (
                        <div className="text-sm">
                            {completedCount}/{totalCount} ({completionPercentage}%)
                        </div>
                    )}
                </div>

                {subtasks.length === 0 ? (
                    <div className="py-4 text-center text-neutral/60">
                        <p>No subtasks defined for this task</p>
                    </div>
                ) : (
                    <>
                        <progress
                            className="progress progress-primary w-full"
                            value={completedCount}
                            max={totalCount}
                        ></progress>

                        <div className="mt-4 space-y-2">
                            {subtasks.map((subtask, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox mr-3"
                                        checked={subtask.completed}
                                        onChange={() => handleToggleSubtask(index, !subtask.completed)}
                                        disabled={isUpdating}
                                    />
                                    <span className={`flex-grow ${subtask.completed ? 'line-through text-neutral/60' : ''}`}>
                                        {subtask.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskSubtasks;