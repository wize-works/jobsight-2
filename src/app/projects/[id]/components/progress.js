import { getProgressColorClass } from "@/lib/styles";
import { getProjectStatusMeta } from "@/lib/enums";

export const ProgressWidget = ({ project }) => {

    const statusMeta = getProjectStatusMeta(project.status);
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-[-8]">Progress</h2>
                <p className="">Current progress of the project</p>
                <hr className="my-2" />
                <p className="flex justify-between"><strong>Status:</strong><span className={`badge ${statusMeta.badge}`}>{statusMeta.label}</span></p>
                <p className="flex justify-between items-center"><strong>Progress:</strong><span><span className="text-3xl font-bold">{project.progress}</span>%</span></p>
                <progress
                    className={`progress ${getProgressColorClass(project.progress)} h-4`}
                    value={project.progress}
                    max="100"
                ></progress>
                <div className="grid grid-cols-2 gap-6 mt-2">
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
    );
};

export default ProgressWidget;