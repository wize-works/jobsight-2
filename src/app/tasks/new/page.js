import Link from "next/link";
import { redirect } from "next/navigation";
import { getProjectsForDropdown } from "../actions/queries";
import { createNewTask } from "../actions/mutations";
import { TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from "@/lib/enums";

export const NewTaskPage = async () => {
    // Fetch projects for dropdown
    const projects = await getProjectsForDropdown();

    const submitForm = async (formData) => {
        'use server';

        try {
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
                subtasks: [], // Subtasks will be added in task detail view
                tags: formData.get("tags") ? formData.get("tags").split(',').map(tag => tag.trim()) : [],
                orderIndex: 0,
            };

            // Get the project name for the selected project
            const selectedProject = projects.find(p => p._id === data.projectId);
            if (selectedProject) {
                data.projectName = selectedProject.name;
            }

            // Create the task
            const result = await createNewTask(data);

            // Redirect to tasks list on success
            redirect('/tasks');
        } catch (error) {
            console.error('Error creating task:', error);
            // Error handling would be implemented here
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/tasks" className="btn">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Tasks
                </Link>
                <h1 className="text-2xl font-bold">Create New Task</h1>
            </div>

            <form action={submitForm} className="space-y-6">
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
                                    defaultValue="pending"
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
                                    defaultValue="normal"
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
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Estimated Hours</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="estimatedHours"
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
                                placeholder="Enter task description"
                                className="textarea textarea-bordered w-full"
                                rows={4}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Tags</h2>
                        <p className="text-sm text-neutral/70">Enter tags separated by commas (e.g. &quot;design, meeting, priority&quot;)</p>

                        <div className="form-control w-full mt-2">
                            <input
                                type="text"
                                name="tags"
                                placeholder="Tags (comma separated)"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Link href="/tasks" className="btn">Cancel</Link>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewTaskPage;