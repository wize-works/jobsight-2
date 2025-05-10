"use client"
import { useState } from "react";
import { getProgressColorClass } from "@/lib/styles";
import { getProjectStatusMeta } from "@/lib/enums";
import { updateProject } from "../../actions/mutations";

export const ProgressWidget = ({ project }) => {
    const [progress, setProgress] = useState(project.progress);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const statusMeta = getProjectStatusMeta(project.status);

    const handleProgressChange = (e) => {
        setProgress(parseInt(e.target.value));
    };

    const handleProgressUpdate = async () => {
        setIsUpdating(true);
        setError(null);

        try {
            // Optimistically update UI first
            const updatedProgress = progress;
            const data = { ...project };
            data.progress = updatedProgress;
            delete data._id;

            // Then send update to the server
            const res1 = await fetch('/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server: 'wize-project',
                    query: `
                mutation ($id: ID! $input: ProjectInput!) {
                    updateProject(id: $id, input: $input) {
                    _id
                    name
                    progress
                    }
                }
            `,
                    variables: { id: project._id, input: data },
                }),
            });
        } catch (err) {
            console.error("Failed to update project progress:", err);
            setError("Failed to update progress. Please try again.");
            // Revert to original value on error
            setProgress(project.progress);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title mb-[-8]">Progress</h2>
                <p className="">Current progress of the project</p>
                <hr className="my-2" />
                <p className="flex justify-between"><strong>Status:</strong><span className={`badge ${statusMeta.badge}`}>{statusMeta.label}</span></p>
                <p className="flex justify-between items-center">
                    <strong>Progress:</strong>
                    <span><span className="text-3xl font-bold">{progress}</span>%</span>
                </p>

                <div className="flex flex-col gap-2">
                    <input
                        type="range"
                        className={`range ${getProgressColorClass(progress)} w-full`}
                        value={progress}
                        onChange={handleProgressChange}
                        onMouseUp={handleProgressUpdate}
                        onTouchEnd={handleProgressUpdate}
                        min="0"
                        max="100"
                        step="5"
                    />
                </div>

                {isUpdating && <p className="text-xs text-info text-center">Updating progress...</p>}
                {error && <p className="text-xs text-error text-center">{error}</p>}

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