import { getProgressColorClass, getBadgeColorClass } from "@/lib/styles";
import RecentActivity from "./recent-activity";
import { getProjectStatusMeta } from "@/lib/enums";


export const ProjectOverview = ({ project }) => {
    const { name, status, progress, description, createdAt } = project;
    const statusMeta = getProjectStatusMeta(status);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card w-full bg-base-100 shadow-xl col-span-2">
                    <div className="card-body">
                        <h2 className="card-title">Project Details</h2>
                        <p className="">General information about this project</p>
                        <h4>Description</h4>
                        <p>{description || "No description provided"}</p>



                    </div>
                </div>
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-[-8]">Progress</h2>
                        <p className="">Current progress of the project</p>
                        <p className="flex justify-between"><strong>Status:</strong><span className={`badge ${statusMeta.badge}`}>{statusMeta.label}</span></p>
                        <p className="flex justify-between items-center"><strong>Progress:</strong><span><span className="text-3xl font-bold">{progress}</span>%</span></p>
                        <div className="progress w-full">
                            <div
                                className={`progress-bar ${getProgressColorClass(progress)}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <div className="flex flex-col text-left space-x-2 bg-base-200 py-2 px-4 rounded-lg">
                                <p>Start Date</p>
                                <p>
                                    {project.startDate ?
                                        <span className="text-sm">{new Date(project.startDate).toLocaleDateString()}</span> :
                                        <span className="text-sm">Not Set</span>
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col text-left space-x-2 bg-base-200 py-2 px-4 rounded-lg">
                                <p>End Date:</p>
                                <p>
                                    {project.endDate ?
                                        <span className="text-sm">{new Date(project.endDate).toLocaleDateString()}</span> :
                                        <span className="text-sm">Not Set</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RecentActivity project={project} />
        </>
    );
};