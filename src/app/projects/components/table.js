import { getBadgeColorClass, getProgressColorClass, getRadialProgressColorClass } from "@/lib/styles";
import { getProjectStatusMeta } from "@/lib/enums";
import Link from "next/link";
import { formatAddress } from "@/lib/format-address";
import { getClientById } from "../actions/queries";

export const Table = async ({ projects }) => {
    // Process projects to include client names
    const processedProjects = await Promise.all(projects.map(async (project) => {
        let clientData = null;
        if (project.client) {
            try {
                clientData = await getClientById(project.client);
            } catch (error) {
                console.error("Error fetching client data:", error);
            }
        }
        return { ...project, clientData };
    }));

    return (
        <div className="bg-base-100 rounded-lg shadow-md w-full">
            <table className="table w-full">
                <thead className="bg-base-200/30 text-base-content">
                    <tr>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Timeline</th>
                    </tr>
                </thead>
                <tbody>
                    {processedProjects.map((project) => {
                        const status = getProjectStatusMeta(project.status);
                        return (
                            <tr key={project._id} className="hover:bg-base-200/30 transition duration-200 ease-in-out">
                                <td className="flex flex-col">
                                    <div className="font-semibold">
                                        <Link href={`/projects/${project._id}`} key={project._id}>{project.name}</Link>
                                    </div>
                                    <div className="text-sm text-neutral/60">{formatAddress(project.address)}</div>
                                </td>
                                <td>
                                    {project.clientData ? (
                                        <Link href={`/clients/${project.client}`} className="hover:text-primary">
                                            {project.clientData.name}
                                        </Link>
                                    ) : (
                                        <span className="text-neutral/60">Unknown</span>
                                    )}
                                </td>
                                <td><span className={`badge badge-sm ${status.badge}`}>{status.label || "Unknown"}</span></td>
                                <td><progress className={`progress ${getProgressColorClass(project.progress)}`} value={project.progress} max={100}></progress></td>
                                <td className="flex flex-col text-sm text-neutral/60">
                                    <div>Start: {project.startDate || "Not Set"}</div>
                                    <div>End: {project.endDate || "Not Set"}</div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div >
    );
}

export default Table;