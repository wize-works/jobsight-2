import { getBadgeColorClass, getProgressColorClass, getRadialProgressColorClass } from "@/lib/styles";
import Link from "next/link";
export const Table = ({ projects }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-md">
            <table className="table">
                <thead className="bg-base-200/30 text-base-content">
                    <tr>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Timeline</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (

                        <tr key={project._id} className="hover:bg-base-200/30 transition duration-200 ease-in-out">
                            <td className="flex flex-col">
                                <div className="font-semibold">
                                    <Link href={`/projects/${project._id}`} key={project._id}>{project.name}</Link>
                                </div>
                                <div className="text-sm text-neutral/60">{project.location}</div>
                            </td>

                            <td><span className={`badge badge-sm ${getBadgeColorClass(project.status)}`}>{project.status || "Unknown"}</span></td>
                            <td><progress className={`progress ${getProgressColorClass(project.progress)}`} value={project.progress} max={100}></progress></td>
                            <td className="flex flex-col text-sm text-neutral/60">
                                <div>Start: {project.startDate || "Not Set"}</div>
                                <div>End: {project.endDate || "Not Set"}</div>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Table;