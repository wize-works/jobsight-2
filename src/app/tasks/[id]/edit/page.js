import Link from "next/link";
import { redirect } from "next/navigation";
import { updateTask, deleteTask } from "../../actions/mutations";
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from "@/lib/enums";
import { getTaskById, getProjectsForDropdown } from "../../actions/queries";

export const EditTaskPage = async ({ params }) => {
    const { id } = params;

    const task = await getTaskById(id);
    const projectsResult = await getProjectsForDropdown();
    const projects = projectsResult || [];

    // Format the date for form display
    const formattedDueDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

    const submitForm = async (formData) => {
        'use server';

        try {
            // Get existing task data from hidden fields
            const existingSubtasks = JSON.parse(formData.get("existingSubtasks") || "[]");
            const existingTags = JSON.parse(formData.get("existingTags") || "[]");
            const taskId = formData.get("taskId");

            // Get form data
            const data = {
                title: formData.get("title"),
                description: formData.get("description"),
                projectId: formData.get("projectId"),
                status: formData.get("status"),
                priority: formData.get("priority"),
                dueDate: formData.get("dueDate"),
                estimatedHours: Number(formData.get("estimatedHours") || 0),
                actualHours: Number(formData.get("actualHours") || 0),
                isCritical: formData.get("isCritical") === "on",
                assignedTo: formData.get("assignedTo") || "",
                assignedToName: formData.get("assignedToName") || "",
                subtasks: existingSubtasks,
                tags: existingTags
            };

            // Get the project name for the selected project
            const projectsData = JSON.parse(formData.get("projectsData") || "[]");
            const selectedProject = projectsData.find(p => p._id === data.projectId);
            if (selectedProject) {
                data.projectName = selectedProject.name;
            }

            // Update the task
            await updateTask(taskId, data);

            // Redirect back to the task details page
            // This will throw a NEXT_REDIRECT "error" that gets caught by Next.js
            redirect(`/tasks/${taskId}`);
        } catch (error) {
            // Check if this is a redirect "error" (not a real error)
            if (error?.digest?.startsWith('NEXT_REDIRECT')) {
                // This is a redirect, not an error, so we just let Next.js handle it
                throw error;
            }

            console.error('Error updating task:', error);
            // Error handling would be implemented here
        }
    };

    const handleDelete = async (formData) => {
        'use server';

        try {
            const taskId = formData.get("taskId");
            await deleteTask(taskId);
            // This will throw a NEXT_REDIRECT "error" that gets caught by Next.js
            redirect('/tasks');
        } catch (error) {
            // Check if this is a redirect "error" (not a real error)
            if (error?.digest?.startsWith('NEXT_REDIRECT')) {
                // This is a redirect, not an error, so we just let Next.js handle it
                throw error;
            }

            console.error('Failed to delete task', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link href={`/tasks/${id}`} className="btn">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Task
                </Link>
                <h1 className="text-2xl font-bold">Edit Task</h1>
                <form action={handleDelete}>
                    <input type="hidden" name="taskId" value={id} />
                    <button
                        type="submit"
                        className="btn btn-error"
                    >
                        <i className="fas fa-trash mr-2"></i>
                        Delete Task
                    </button>
                </form>
            </div>

            <form action={submitForm} className="space-y-6">
                {/* Hidden fields to pass task data to server action */}
                <input type="hidden" name="taskId" value={id} />
                <input type="hidden" name="existingSubtasks" value={JSON.stringify(task.subtasks || [])} />
                <input type="hidden" name="existingTags" value={JSON.stringify(task.tags || [])} />
                <input type="hidden" name="projectsData" value={JSON.stringify(projects)} />

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Task Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Task Title</span>
                                    <span className="label-text-alt text-error">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={task.title}
                                    placeholder="Enter task title"
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Project</span>
                                </label>
                                <select
                                    name="projectId"
                                    defaultValue={task.projectId}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select a project</option>
                                    {projects.map(project => (
                                        <option key={project._id} value={project._id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                    <span className="label-text-alt text-error">*</span>
                                </label>
                                <select
                                    name="status"
                                    defaultValue={task.status}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    {TASK_STATUS_OPTIONS.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Priority</span>
                                    <span className="label-text-alt text-error">*</span>
                                </label>
                                <select
                                    name="priority"
                                    defaultValue={task.priority}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    {TASK_PRIORITY_OPTIONS.map(priority => (
                                        <option key={priority.value} value={priority.value}>
                                            {priority.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Due Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    defaultValue={formattedDueDate}
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Assigned To</span>
                                </label>
                                <input
                                    type="text"
                                    name="assignedToName"
                                    defaultValue={task.assignedToName}
                                    placeholder="Enter assignee name"
                                    className="input input-bordered w-full"
                                />
                                <p className="text-xs text-neutral/60 mt-1">
                                    In a real app, this would be a dropdown of users
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Estimated Hours</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="estimatedHours"
                                        defaultValue={task.estimatedHours}
                                        min="0"
                                        step="0.5"
                                        placeholder="0"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Actual Hours</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="actualHours"
                                        defaultValue={task.actualHours}
                                        min="0"
                                        step="0.5"
                                        placeholder="0"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                            </div>

                            <div className="form-control items-start">
                                <label className="label cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isCritical"
                                        defaultChecked={task.isCritical}
                                        className="checkbox checkbox-error mr-2"
                                    />
                                    <span className="label-text">Mark as Critical</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-control w-full mt-4">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                defaultValue={task.description}
                                placeholder="Enter task description"
                                className="textarea textarea-bordered w-full"
                                rows={4}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Subtasks</h2>
                        <p>Subtasks are managed in task detail view</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Tags</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {task.tags && task.tags.map((tag, index) => (
                                <div key={index} className="badge badge-outline">
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <p className="mt-2 text-sm text-neutral/60">Tags can be managed in task detail view</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Link href={`/tasks/${id}`} className="btn">Cancel</Link>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskPage;