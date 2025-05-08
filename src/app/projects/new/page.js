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
            budget: Number(formData.get("budget") || 0),
            // Add address structure
            address: {
                street: formData.get("street"),
                city: formData.get("city"),
                state: formData.get("state"),
                postalCode: formData.get("postalCode"),
                country: formData.get("country")
            }
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
                    <p>Enter basic project details and scheduling information</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <fieldset className="fieldset">
                                <div className="indicator -mt-1">
                                    <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                    <legend className="fieldset-legend">Project Name</legend>
                                </div>
                                <input name="name" type="text" className="input validator w-full" placeholder="Project Name" required />
                                <div className="validator-hint">This field is required.</div>
                            </fieldset>
                            <input name="location" type="text" className="input validator w-full hidden" placeholder="Location (e.g., 34.0522, -118.2437)" />
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                            <fieldset className="fieldset col-span-6">
                                <legend className="fieldset-legend">Street Address</legend>
                                <input name="street" type="text" className="input input-bordered w-full" placeholder="123 Main St" />
                            </fieldset>
                            <fieldset className="fieldset col-span-3">
                                <legend className="fieldset-legend">City</legend>
                                <input name="city" type="text" className="input input-bordered w-full" placeholder="City" />
                            </fieldset>
                            <fieldset className="fieldset col-span-1">
                                <legend className="fieldset-legend">State/Province</legend>
                                <input name="state" type="text" className="input input-bordered w-full" placeholder="State" />
                            </fieldset>
                            <fieldset className="fieldset col-span-2">
                                <legend className="fieldset-legend">Postal Code</legend>
                                <input name="postalCode" type="text" className="input input-bordered w-full" placeholder="Postal Code" />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Country</legend>
                                <input name="country" type="text" className="input input-bordered w-full" placeholder="Country" />
                            </fieldset>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Project Description"></textarea>
                        </fieldset>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Status</legend>
                            </div>
                            <select name="status" className="select select-bordered w-full" required>
                                <option value="">Select Status</option>
                                {PROJECT_STATUS_OPTIONS.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Progress</legend>
                            <input name="progress" type="range" className="range range-primary w-full" placeholder="Progress (%)" value={0} min="0" max="100" required />
                        </fieldset>
                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Start Date</legend>
                            </div>
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
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Client</legend>
                            </div>
                            <input name="client" type="text" className="input focus:input-primary w-full" placeholder="Client Name" required />
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Client Contact</legend>
                            <input name="clientContact" type="text" className="input validator w-full" placeholder="Client Contact" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Budget</legend>
                            </div>
                            <label className="input validator w-full">
                                <i className="fas fa-dollar-sign"></i>
                                <input name="budget" type="number" placeholder="5,000" required />
                            </label>
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                    </div>
                    <div className="mt-6">
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