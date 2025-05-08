import { getProgressColorClass } from "@/lib/styles";
import { getProjectStatusMeta } from "@/lib/enums";


export const ProjectOverview = ({ project }) => {
    const { name, status, progress, description, createdAt, address, client, budget, updatedAt, location } = project;
    const statusMeta = getProjectStatusMeta(status);

    // Format currency for budget
    const formattedBudget = budget ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(budget) : 'Not set';

    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl col-span-2">
                <div className="card-body">
                    <h2 className="card-title">Project Details</h2>
                    <p className="">General information about this project</p>
                    <hr className="my-2" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-semibold text-lg">Description</h4>
                            <p>{description || "No description provided"}</p>

                            <h4 className="font-semibold text-lg mt-4">Client</h4>
                            <p>{client || "Not specified"}</p>

                            <h4 className="font-semibold text-lg mt-4">Budget</h4>
                            <p>{formattedBudget}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg">Address</h4>
                            {address ? (
                                <div>
                                    <p>{address.street || ""}</p>
                                    <p>{address.city || ""}{address.city && address.state ? ', ' : ''}{address.state || ""} {address.postalCode || ""}</p>
                                    <p>{address.country || ""}</p>
                                </div>
                            ) : (
                                <p>No address provided</p>
                            )}

                            <div className="mt-4">
                                <h4 className="font-semibold text-lg">Created</h4>
                                <p>{createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown"}</p>
                            </div>

                            <div className="mt-4">
                                <h4 className="font-semibold text-lg">Last Updated</h4>
                                <p>{updatedAt ? new Date(updatedAt).toLocaleDateString() : "Unknown"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};