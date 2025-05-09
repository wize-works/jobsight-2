import { getClientStatusMeta } from "@/lib/enums";
import Image from "next/image";

export const ClientOverview = ({ client }) => {
    const { name, contactPerson, email, phone, website, status, address, notes, logo, industry, tags, createdAt, updatedAt } = client;
    const statusMeta = getClientStatusMeta(status);

    return (
        <div className="card w-full bg-base-100 shadow-xl col-span-2">
            <div className="card-body">
                <div className="flex items-start gap-6">
                    <div className="rounded-xl overflow-hidden w-32 h-32 flex-shrink-0 bg-base-200 flex items-center justify-center">
                        {logo ? (
                            <Image width={128} height={128} src={"/banner.png"} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <i className="far fa-building text-5xl text-neutral/40"></i>
                        )}
                    </div>

                    <div className="flex-grow">
                        <div className="flex justify-between items-center">
                            <h2 className="card-title text-2xl">{name}</h2>
                            <span className={`badge ${statusMeta.badge}`}>{statusMeta.label}</span>
                        </div>

                        {industry && (
                            <div className="mt-1 text-sm text-neutral/70">
                                <span>{industry}</span>
                            </div>
                        )}

                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                                {tags.map((tag, index) => (
                                    <span key={index} className="badge badge-sm">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <i className="far fa-user mr-3 w-5 text-center"></i>
                                <span>{contactPerson}</span>
                            </div>
                            <div className="flex items-center">
                                <i className="far fa-envelope mr-3 w-5 text-center"></i>
                                <a href={`mailto:${email}`} className="link link-primary">{email}</a>
                            </div>
                            {phone && (
                                <div className="flex items-center">
                                    <i className="far fa-phone mr-3 w-5 text-center"></i>
                                    <a href={`tel:${phone}`} className="link link-primary">{phone}</a>
                                </div>
                            )}
                            {website && (
                                <div className="flex items-center">
                                    <i className="far fa-globe mr-3 w-5 text-center"></i>
                                    <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="link link-primary">{website}</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-2">Address</h3>
                        {address ? (
                            <div>
                                <p>{address.street || ""}</p>
                                <p>{address.city || ""}{address.city && address.state ? ', ' : ''}{address.state || ""} {address.postalCode || ""}</p>
                                <p>{address.country || ""}</p>
                            </div>
                        ) : (
                            <p className="text-neutral/60">No address provided</p>
                        )}

                        <div className="mt-6">
                            <h3 className="font-semibold text-lg mb-2">Client Since</h3>
                            <p>{createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown"}</p>
                        </div>
                    </div>
                </div>

                {notes && (
                    <>
                        <hr className="my-4" />
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Notes</h3>
                            <p className="whitespace-pre-wrap">{notes}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientOverview;