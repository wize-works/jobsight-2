import Link from "next/link";
import { redirect } from "next/navigation";
import { createNewClient } from "../actions/mutations";
import { CLIENT_STATUS_OPTIONS } from "@/lib/enums";
import Image from "next/image";
import dynamic from "next/dynamic";
import ClientLogoUploader from "../components/logo-uploader";


export const ClientsNewPage = () => {

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
            tags: formData.get("tags") ? formData.get("tags").split(',').map(tag => tag.trim()) : [],
            logo: formData.get("logo") || null,
        };

        const result = await createNewClient(data);
        if (result) {
            console.log("Client created successfully:", result);
            redirect(`/clients/${result._id}`);
        } else {
            console.error("Failed to create client", result);
        }
    };

    return (
        <div className="space-y-1">
            <form action={submitForm}>
                <div className='flex items-center mb-4 text-secondary'>
                    <Link href="/clients" className="">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Clients
                    </Link>
                </div>
                <h1 className="text-2xl font-bold">Create New Client</h1>
                <p className="text-sm pb-6">Fill in the details below to create a new client.</p>

                <div className="card bg-base-100 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-0">Client Information</h2>
                    <p>Enter basic client details and contact information</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Company Name</legend>
                            </div>
                            <input name="name" type="text" className="input validator w-full" placeholder="Company Name" required />
                            <div className="validator-hint">This field is required.</div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Company Logo</legend>
                            <ClientLogoUploader element="logoUrl" />
                            <input type="hidden" name="logo" id="logoUrl" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Industry</legend>
                            <input name="industry" type="text" className="input input-bordered w-full" placeholder="Industry" />
                        </fieldset>

                        <fieldset className="fieldset">
                            <div className="indicator -mt-1">
                                <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                <legend className="fieldset-legend">Status</legend>
                            </div>
                            <select name="status" className="select select-bordered w-full" required defaultValue="active">
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
                            />
                            <div className="text-xs text-neutral/70 mt-1">Separate tags with commas</div>
                        </fieldset>
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold mb-0">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <fieldset className="fieldset">
                                    <div className="indicator -mt-1">
                                        <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                        <legend className="fieldset-legend">Contact Person</legend>
                                    </div>
                                    <input name="contactPerson" type="text" className="input validator w-full" placeholder="Contact Person" required />
                                    <div className="validator-hint">This field is required.</div>
                                </fieldset>

                                <fieldset className="fieldset">
                                    <div className="indicator -mt-1">
                                        <span className="indicator-item indicator-end indicator-middle -mr-8 badge badge-warning badge-xs">required</span>
                                        <legend className="fieldset-legend">Email</legend>
                                    </div>
                                    <input name="email" type="email" className="input validator w-full" placeholder="Email" required />
                                    <div className="validator-hint">This field is required.</div>
                                    <div className="validator-hint">This field needs to be a valid email.</div>
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Phone</legend>
                                    <input name="phone" type="tel" className="input input-bordered w-full" placeholder="Phone Number" />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Website</legend>
                                    <input name="website" type="url" className="input input-bordered w-full" placeholder="Website" />
                                </fieldset>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-0">Address</h2>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
                                <fieldset className="fieldset md:col-span-6">
                                    <legend className="fieldset-legend">Street</legend>
                                    <input name="street" type="text" className="input input-bordered w-full" placeholder="Street Address" />
                                </fieldset>

                                <fieldset className="fieldset md:col-span-3">
                                    <legend className="fieldset-legend">City</legend>
                                    <input name="city" type="text" className="input input-bordered w-full" placeholder="City" />
                                </fieldset>

                                <fieldset className="fieldset md:col-span-1">
                                    <legend className="fieldset-legend">State</legend>
                                    <input name="state" type="text" className="input input-bordered w-full" placeholder="State" />
                                </fieldset>

                                <fieldset className="fieldset md:col-span-2">
                                    <legend className="fieldset-legend">Postal Code</legend>
                                    <input name="postalCode" type="text" className="input input-bordered w-full" placeholder="Postal Code" />
                                </fieldset>

                                <fieldset className="fieldset md:col-span-2">
                                    <legend className="fieldset-legend">Country</legend>
                                    <input name="country" type="text" className="input input-bordered w-full" placeholder="Country" defaultValue="USA" />
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Notes</legend>
                            <textarea name="notes" className="textarea textarea-bordered w-full h-32" placeholder="Additional notes about this client..."></textarea>
                        </fieldset>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save mr-2"></i>
                            Create Client
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ClientsNewPage;
