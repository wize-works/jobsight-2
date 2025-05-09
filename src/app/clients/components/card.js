import Image from "next/image";
import Link from "next/link";
import { getClientStatusMeta } from "@/lib/enums";
import { formatAddress } from "@/lib/format-address";

export const Card = ({ client }) => {
    const status = getClientStatusMeta(client.status);

    return (
        <div className="card bg-base-100 shadow-lg relative" >
            <figure className="max-h-60 overflow-hidden">
                <Image
                    width={800}
                    height={600}
                    src={client.logo || "/banner.png"}
                    alt={client.name || "Client Logo"}
                    className="" />
                <div className="absolute top-2 right-2">
                    <span className={`badge ${status.badge} `}>
                        {status.label}
                    </span>
                </div>
            </figure>
            <div className="card-body grow">
                <h2 className="text-lg line-clamp-2 font-semibold">
                    <Link href={`/clients/${client._id}`} className="hover:text-primary">{client.name}</Link>
                </h2>
                <p className="mt-2 line-clamp-3">{client.notes}</p>
                <div className="flex items-center flex-wrap gap-y-2 mt-2">
                    {client.address && (
                        <div className="w-full flex items-start">
                            <i className="far fa-map-marker-alt mr-2 mt-1"></i>
                            <span className="line-clamp-2">{formatAddress(client.address)}</span>
                        </div>
                    )}
                    <div className="w-full md:w-1/2 flex items-center">
                        <i className="far fa-user mr-2"></i>
                        {client.contactPerson || "No contact"}
                    </div>
                    <div className="w-full md:w-1/2 flex items-center">
                        <i className="far fa-envelope mr-2"></i>
                        {client.email || "No email"}
                    </div>
                </div>
            </div>
            <div className="flex-none card-body rounded-b-lg bg-base-200/50 border-t-1 border-base-300 flex flex-row justify-between items-center p-3 text-xs">
                <div className="flex items-center space-x-2">
                    <i className="far fa-building mr-2"></i>
                    <span>{client.industry || "No industry"}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <i className="far fa-phone mr-2"></i>
                    <span>{client.phone || "No phone"}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;