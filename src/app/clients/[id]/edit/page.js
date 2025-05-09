import Link from "next/link";
import { redirect } from "next/navigation";
import { updateClient } from "../../actions/mutations";
import { CLIENT_STATUS_OPTIONS } from "@/lib/enums";
import { getClientById } from "../../actions/queries";

export const ClientEditPage = async ({ params }) => {
    const { id } = await params;
    const client = await getClientById(id);

    const submitForm = async (formData) => {
        'use server';
        const data = {
            name: formData.get("name"),
            contactPerson: formData.get("contactPerson"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            website: formData.get("website"),
            status: formData.get("status"),
            industry: formData.get("industry"),
            notes: formData.get("notes"),
            address: {
                street: formData.get("street"),
                city: formData.get("city"),
                state: formData.get("state"),
                postalCode: formData.get("postalCode"),
                country: formData.get("country") || "USA"
            },
            // Handle tags as a comma-separated string
            tags: formData.get("tags") ? formData.get("tags").split(',').map(tag => tag.trim()) : []
        };

        const result = await updateClient(id, data);
        if (result) {
            console.log("Client updated successfully:", result);
            // Redirect back to client details page
            redirect(`/clients/${id}`);
        } else {
            console.error("Failed to update client", result);
            // Error handling would be implemented here
        }
    };

    return (
        <div className="space-y-1">
            <form action={submitForm}>
                <div className='flex items-center mb-4 text-secondary'>
                    <Link href={`/clients/${id}`} className="">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Client
                    </Link>
                </div>
                <h1 className="text-2xl font-bold">Edit Client</h1>
                <p className="text-sm pb-6">Update the client information below</p>

                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-0">Client Information</h2>
                    <p>Update basic client details and contact information</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Company Name</legend>
                            </div>
                            <input name="name" type="text" className="input validator w-full" placeholder="Company Name" required defaultValue={client.name} />
                            <div className="validator-hint">This field is required.</div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Industry</legend>
                            <input name="industry" type="text" className="input input-bordered w-full" placeholder="Industry" defaultValue={client.industry || ""} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Status</legend>
                            </div>
                            <select name="status" className="select select-bordered w-full" required defaultValue={client.status}>
                                <option value="">Select Status</option>
                                {CLIENT_STATUS_OPTIONS.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Tags</legend>
                            <input
                                name="tags"
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Tags (comma separated)"
                                defaultValue={client.tags ? client.tags.join(', ') : ''}
                            />
                            <div className="text-xs text-neutral/70 mt-1">Separate tags with commas</div>
                        </fieldset>
                    </div>

                    <hr className="my-4" />
                    <h2 className="text-lg font-semibold mb-0">Contact Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Contact Person</legend>
                            </div>
                            <input name="contactPerson" type="text" className="input validator w-full" placeholder="Contact Person" required defaultValue={client.contactPerson} />
                            <div className="validator-hint">This field is required.</div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Email</legend>
                            </div>
                            <input name="email" type="email" className="input validator w-full" placeholder="Email" required defaultValue={client.email} />
                            <div className="validator-hint">This field is required.</div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Phone</legend>
                            <input name="phone" type="tel" className="input input-bordered w-full" placeholder="Phone Number" defaultValue={client.phone || ""} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Website</legend>
                            <input name="website" type="url" className="input input-bordered w-full" placeholder="Website" defaultValue={client.website || ""} />
                        </fieldset>
                    </div>

                    <hr className="my-4" />
                    <h2 className="text-lg font-semibold mb-0">Address</h2>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
                        <fieldset className="fieldset md:col-span-6">
                            <legend className="fieldset-legend">Street</legend>
                            <input name="street" type="text" className="input input-bordered w-full" placeholder="Street Address" defaultValue={client.address?.street || ""} />
                        </fieldset>

                        <fieldset className="fieldset md:col-span-3">
                            <legend className="fieldset-legend">City</legend>
                            <input name="city" type="text" className="input input-bordered w-full" placeholder="City" defaultValue={client.address?.city || ""} />
                        </fieldset>

                        <fieldset className="fieldset md:col-span-1">
                            <legend className="fieldset-legend">State</legend>
                            <input name="state" type="text" className="input input-bordered w-full" placeholder="State" defaultValue={client.address?.state || ""} />
                        </fieldset>

                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">Postal Code</legend>
                            <input name="postalCode" type="text" className="input input-bordered w-full" placeholder="Postal Code" defaultValue={client.address?.postalCode || ""} />
                        </fieldset>

                        <fieldset className="fieldset md:col-span-2">
                            <legend className="fieldset-legend">Country</legend>
                            <input name="country" type="text" className="input input-bordered w-full" placeholder="Country" defaultValue={client.address?.country || "USA"} />
                        </fieldset>
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Notes</legend>
                            <textarea name="notes" className="textarea textarea-bordered w-full h-32" placeholder="Additional notes about this client..." defaultValue={client.notes || ""}></textarea>
                        </fieldset>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save mr-2"></i>
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ClientEditPage;