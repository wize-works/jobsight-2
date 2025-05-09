import Link from "next/link";
import { executeGraphQL } from "@/lib/execute-graphql";
import { getProjectStatusMeta } from "@/lib/enums";

const getClientProjects = async (clientId) => {
    const service = 'wize-project';
    const query = `
        query ($filter: ProjectFilter, $sort: ProjectSort, $paging: ProjectPaging) {
            findProjects(filter: $filter, sort: $sort, paging: $paging) {
                count
                data {
                    _id
                    name
                    status
                    progress
                    startDate
                    endDate
                }
            }
        }
    `;

    const filter = { client_eq: clientId };
    const sort = { createdAt: 'DESC' };
    const paging = { limit: 5 };

    const data = await executeGraphQL(service, query, { filter, sort, paging });
    if (data && data.findProjects) {
        return data.findProjects;
    } else {
        return { count: 0, data: [] };
    }
};

export const ClientProjects = async ({ clientId }) => {
    const { data: projects = [], count = 0 } = await getClientProjects(clientId);

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Client Projects</h2>
                <p className="text-sm">Recent projects for this client</p>
                <hr className="my-2" />

                {projects.length > 0 ? (
                    <div className="space-y-3">
                        {projects.map((project) => {
                            const status = getProjectStatusMeta(project.status);
                            return (
                                <div key={project._id} className="flex items-center gap-2 bg-base-200/40 p-3 rounded-lg">
                                    <div className="flex-grow">
                                        <Link href={`/projects/${project._id}`} className="font-medium hover:text-primary">
                                            {project.name}
                                        </Link>
                                        <div className="text-xs mt-1 flex items-center">
                                            <span className={`badge badge-xs ${status.badge} mr-2`}></span>
                                            <span>{status.label}</span>
                                        </div>
                                    </div>
                                    <div className="radial-progress text-primary" style={{ "--value": project.progress || 0, "--size": "2rem" }} role="progressbar">
                                        <span className="text-xs">{project.progress || 0}%</span>
                                    </div>
                                </div>
                            );
                        })}

                        {count > projects.length && (
                            <div className="text-center mt-3">
                                <Link href={`/projects?client=${clientId}`} className="link link-primary text-sm">
                                    View all {count} projects
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-base-200/40 p-6 rounded-lg text-center">
                        <p className="text-neutral/70">No projects found for this client</p>
                        <Link href="/projects/new" className="btn btn-sm btn-primary mt-4">
                            <i className="far fa-plus mr-2"></i>
                            Create Project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientProjects;