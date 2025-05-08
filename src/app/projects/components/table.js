import { getBadgeColorClass, getProgressColorClass, getRadialProgressColorClass } from "@/lib/styles";
import Link from "next/link";
export const Table = ({ projects }) => {
    return (
        <div className="overflow-x-auto bg-base-100 p-6 rounded-lg shadow-md">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Timeline</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (

                        <tr key={project._id}>
                            <td className="flex flex-col">
                                <div>
                                    <Link href={`/projects/${project._id}`} key={project._id}>{project.name}</Link>
                                </div>
                                <div className="text-sm text-gray-500">{project.location}</div>
                            </td>

                            <td><span className={`badge badge-sm ${getBadgeColorClass(project.status)}`}>{project.status}</span></td>
                            <td><div className={`radial-progress ${getRadialProgressColorClass(project.progress)}`} aria-valuenow={project.progress} style={{ "--value": `${project.progress}`, "--size": "2rem" }} role="progressbar">{project.progress}%</div></td>
                            <td className="flex flex-col text-sm">
                                <div>Start: {project.startDate || "Not Set"}</div>
                                <div>End: {project.endDate || "Not Set"}</div>
                            </td>
                            <td>{new Date(project.updatedAt).toLocaleDateString()}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default Table;