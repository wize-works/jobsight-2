import Link from "next/link";
import { createNewProject } from "../actions/mutations";
import { PROJECT_STATUS_OPTIONS } from "@/lib/enums";

export const ProjectsNewPage = () => {
    const submitForm = async (formData) => {
        'use server';
        const data = {
            name: formData.get("name"),
            location: formData.get("location"),
            description: formData.get("description"),
            status: formData.get("status"),
            progress: Number(formData.get("progress") || 0),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            client: formData.get("client"),
            clientContact: formData.get("clientContact"),
            budget: Number(formData.get("budget") || 0)
        };

        const result = await createNewProject(data);
        if (result) {
            console.log("Project created successfully:", result);
            // Redirect to the project details page or show a success message
        } else {
            console.error("Failed to create project", result);
            // Show an error message
        }

    };

    return (
        <div className="space-y-1">
            <form action={submitForm}>
                <div className='flex items-center mb-4 text-secondary'>
                    <Link href="/projects" className="">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Projects
                    </Link>
                </div>
                <h1 className="text-2xl font-bold">Create New Project</h1>
                <p className="text-sm pb-6">Fill in the details below to create a new project.</p>

                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-0">Project Information</h2>
                    <p>Enter basic project detilas and scheduling information</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Project Name</legend>
                            <div className="indicator w-full">
                                <span className="indicator-item indicator-end indicator-bottom mr-10 badge badge-error badge-xs">required</span>
                                <input name="name" type="text" className="input validator w-full" placeholder="Project Name" required />
                            </div>
                            <div className="validator-hint">This field is required.</div>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Location</legend>
                            <div className="indicator w-full">
                                <span className="indicator-item indicator-end indicator-bottom mr-10 badge badge-error badge-xs">required</span>
                                <input name="location" type="text" className="input validator w-full" placeholder="Location" required />
                            </div>
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Project Description"></textarea>
                        </fieldset>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <div className="indicator w-full">
                                <span className="indicator-item indicator-end indicator-bottom mr-10 badge badge-error badge-xs">required</span>
                                <select name="status" className="select select-bordered w-full" required>
                                    <option value="">Select Status</option>
                                    {PROJECT_STATUS_OPTIONS.map((status) => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Progress</legend>
                            <input name="progress" type="range" className="range range-primary w-full" placeholder="Progress (%)" min="0" max="100" required />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Start Date</legend>
                            <input name="startDate" type="date" className="input input-bordered w-full" required />
                            <p className="label">This field is required</p>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">End Date</legend>
                            <input name="endDate" type="date" className="input input-bordered w-full" />
                        </fieldset>
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-lg font-semibold mb-0">Client Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Client</legend>
                            <div className="indicator w-full">
                                <span className="indicator-item indicator-end indicator-bottom mr-10 badge badge-error badge-xs">required</span>
                                <input name="client" type="text" className="input focus:input-primary w-full" placeholder="Client Name" required />
                            </div>
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Client Contact</legend>
                            <input type="text" className="input validator w-full" placeholder="Client Contact" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Budget</legend>
                            <div className="indicator w-full">
                                <span className="indicator-item indicator-end indicator-bottom mr-10 badge badge-error badge-xs">required</span>

                                <label className="input validator w-full">
                                    <i className="fas fa-dollar-sign"></i>
                                    <input name="budget" type="number" placeholder="5,000" required />
                                </label>
                            </div>
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save mr-2"></i>
                            Save Project
                        </button>
                    </div>
                </div >
            </form >
        </div >
    );
};

export default ProjectsNewPage;