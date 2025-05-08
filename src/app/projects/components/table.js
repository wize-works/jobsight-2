import { getBadgeColorClass, getProgressColorClass, getRadialProgressColorClass } from "@/lib/styles";
import { getProjectStatusMeta } from "@/lib/enums";
import Link from "next/link";
import { formatAddress } from "@/lib/format-address";
export const Table = ({ projects }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-md w-full">
            <table className="table w-full">
                <thead className="bg-base-200/30 text-base-content">
                    <tr>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Timeline</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => {
                        const status = getProjectStatusMeta(project.status);
                        return (
                            <tr key={project._id} className="hover:bg-base-200/30 transition duration-200 ease-in-out">
                                <td className="flex flex-col">
                                    <div className="font-semibold">
                                        <Link href={`/projects/${project._id}`} key={project._id}>{project.name}</Link>
                                    </div>
                                    <div className="text-sm text-neutral/60">{formatAddress(project.address)}</div>
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