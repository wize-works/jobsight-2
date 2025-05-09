import Link from "next/link";
import { redirect } from "next/navigation";
import { updateProject } from "../../actions/mutations";
import { PROJECT_STATUS_OPTIONS } from "@/lib/enums";
import { getProjectById, getClients } from "../../actions/queries";
import { LocationWidget } from "../../components/location";

export const ProjectsEditPage = async ({ params }) => {
    const { id } = await params;

    const project = await getProjectById(id);
    // Fetch clients for dropdown
    const clientsResult = await getClients({ options: {} });
    const clients = clientsResult?.data || [];

    const submitForm = async (formData) => {
        'use server';
        const data = {
            name: formData.get("name"),
            address: {
                street: formData.get("street"),
                city: formData.get("city"),
                state: formData.get("state"),
                postalCode: formData.get("postalCode"),
                country: formData.get("country") || "US"
            },
            location: formData.get("location"),
            description: formData.get("description"),
            budget: formData.get("budget"),
            status: formData.get("status"),
            progress: Number(formData.get("progress") || 0),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            client: formData.get("client"),
            clientContact: formData.get("clientContact"),
            budget: Number(formData.get("budget") || 0)
        };

        const result = await updateProject(id, data);
        if (result) {
            console.log("Project updated successfully:", result);
            // Redirect back to project details page
            redirect(`/projects/${id}`);
        } else {
            console.error("Failed to update project", result);
            // Error handling would be implemented here
        }
    };

    return (
        <div className="space-y-1">
            <form action={submitForm}>
                <div className='flex items-center mb-4'>
                    <Link href="/projects" className="btn">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Projects
                    </Link>
                </div>
                <h1 className="text-2xl font-bold">Edit Project</h1>
                <p className="text-sm pb-6">Fill in the details below to create a new project.</p>

                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-0">Project Information</h2>
                    <p>Enter basic project detilas and scheduling information</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Project Name</legend>
                            </div>
                            <input name="name" type="text" className="input validator w-full" placeholder="Project Name" required defaultValue={project.name} />
                            <div className="validator-hint">This field is required.</div>
                        </fieldset>
                        <div>
                            <LocationWidget location={project.location} address={project.address} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Project Description" defaultValue={project.description}></textarea>
                        </fieldset>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Status</legend>
                            </div>
                            <select name="status" className="select select-bordered w-full" required defaultValue={project.status}>
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
                            <input name="progress" type="range" className="range range-primary w-full" placeholder="Progress (%)" min="0" max="100" required defaultValue={project.progress} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <div className="indicator">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Start Date</legend>
                            </div>
                            <input name="startDate" type="date" className="input input-bordered w-full" required defaultValue={project.startDate} />
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">End Date</legend>
                            <input name="endDate" type="date" className="input input-bordered w-full" defaultValue={project.endDate} />
                        </fieldset>
                    </div>
                    <hr className="my-4" />
                    <h2 className="text-lg font-semibold mb-0">Client Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Client</legend>
                            </div>
                            <select name="client" className="select select-bordered w-full" required defaultValue={project.client}>
                                <option value="">Select Client</option>
                                {clients.map((client) => (
                                    <option key={client._id} value={client._id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                            <p className="validator-hint">This field is required</p>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Client Contact</legend>
                            <input type="text" className="input validator w-full" placeholder="Client Contact" defaultValue={project.clientContact} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <div className="indicator">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Budget</legend>
                            </div>
                            <label className="input validator w-full">
                                <i className="fas fa-dollar-sign"></i>
                                <input name="budget" type="number" placeholder="5,000" required defaultValue={project.budget} />
                            </label>
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

export default ProjectsEditPage;