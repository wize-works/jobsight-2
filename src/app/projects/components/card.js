import Image from "next/image";
import { getProgressColorClass, getBadgeColorClass } from "@/lib/styles";
import Link from "next/link";
import { getProjectStatusMeta } from "@/lib/enums";
import { formatAddress } from "@/lib/format-address";
import { getClientById } from "../actions/queries";

export const Card = async ({ project }) => {
    const status = getProjectStatusMeta(project.status);
    
    // Fetch client data if client ID exists
    let clientData = null;
    if (project.client) {
        try {
            clientData = await getClientById(project.client);
        } catch (error) {
            console.error("Error fetching client data:", error);
        }
    }

    return (
        <div className="card bg-base-100 shadow-lg relative" >
            <figure className="max-h-60 overflow-hidden">
                <Image
                    width={800}
                    height={600}
                    src={project.image || "/banner.png"}
                    alt={project.name || "Project Image"}
                    className="" />
                <div className="absolute top-2 right-2">
                    <span className={`badge ${status.badge} `}>
                        {status.label}
                    </span>
                </div>
            </figure>
            <div className="card-body grow">
                <progress className={`progress ${getProgressColorClass(project.progress)} h-4`} value={project.progress} max="100"></progress>
                <h2 className="text-lg line-clamp-2 font-semibold">
                    <Link href={`/projects/${project._id}`} className="hover:text-primary">{project.name}</Link>
                </h2>
                <p className="mt-2 line-clamp-3">{project.description}</p>
                <div className="flex items-center flex-wrap gap-y-2 mt-2">
                    {project.address && (
                        <div className="w-full flex items-start">
                            <i className="far fa-map-marker-alt mr-2 mt-1"></i>
                            <span className="line-clamp-2">{formatAddress(project.address)}</span>
                        </div>
                    )}
                    <div className="w-full md:w-1/2 flex items-center">
                        <i className="far fa-building mr-2"></i>
                        {clientData ? (
                            <Link href={`/clients/${clientData._id}`} className="hover:text-primary">
                                {clientData.name}
                            </Link>
                        ) : (
                            "unknown"
                        )}
                    </div>
                    <div className="w-full md:w-1/2 flex items-center">
                        <i className="far fa-calendar-alt mr-2"></i>
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : "No date"}
                    </div>
                </div>
            </div>
            <div className="flex-none card-body rounded-b-lg bg-base-200/50 border-t-1 border-base-300 flex flex-row justify-between items-center p-3 text-xs">
                <div className="flex items-center space-x-2">
                    <i className="far fa-user mr-2"></i>
                    <span>Created by: {project.createdBy || "unknown"}</span>
                </div>
                <span>{project.progress || 0}%</span>
            </div>
        </div>
    );
};

export default Card;