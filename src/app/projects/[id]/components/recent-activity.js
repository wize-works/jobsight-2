import { getProgressColorClass } from "@/lib/styles";
import { format, formatDistanceToNow } from "date-fns";

export const RecentActivity = ({ project }) => {
    const { progress, status, createdAt } = project;
    const progressColorClass = getProgressColorClass(progress);

    return (

        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Recent Activity</h2>
                <p>Latest logs and tasks for this project</p>
                <ul className="list">
                    <li className="font-bold">Recent Daily Logs</li>
                    <li className="list-row">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-secondary/20 w-10 h-10 relative flex items-center justify-center">
                                <i className="fas fa-notes fa-fw fa-lg text-secondary"></i>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="font-bold">Daily log created by John Doe</span>
                                <span className="">TODO: link logs</span>
                            </div>
                        </div>
                        <span className="badge badge-secondary badge-sm ml-auto">{formatDistanceToNow(createdAt)}</span>
                    </li>
                    <li className="list-row">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-secondary/20 w-10 h-10 relative flex items-center justify-center">
                                <i className="fas fa-notes fa-fw fa-lg text-secondary"></i>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="font-bold">Daily log created by John Doe</span>
                                <span className="">TODO: link logs</span>
                            </div>
                        </div>
                        <span className="badge badge-secondary badge-sm ml-auto">{formatDistanceToNow(createdAt)}</span>
                    </li>
                    <li className="list-row">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-secondary/20 w-10 h-10 relative flex items-center justify-center">
                                <i className="fas fa-notes fa-fw fa-lg text-secondary"></i>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="font-bold">Daily log created by John Doe</span>
                                <span className="">TODO: link logs</span>
                            </div>
                        </div>
                        <span className="badge badge-secondary badge-sm ml-auto">{formatDistanceToNow(createdAt)}</span>
                    </li>
                </ul>
                <hr />

                <ul className="list">
                    <li className="font-bold">Recent Tasks</li>
                    <li className="list-row">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-secondary/20 w-10 h-10 relative flex items-center justify-center">
                                <i className="fas fa-tasks fa-fw fa-lg text-secondary"></i>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="font-bold">Task created by John Doe</span>
                                <span className="">TODO: link tasks</span>
                            </div>
                        </div>
                        <span className="badge badge-secondary badge-sm ml-auto">{formatDistanceToNow(createdAt)}</span>
                    </li>
                    <li className="list-row">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-secondary/20 w-10 h-10 relative flex items-center justify-center">
                                <i className="fas fa-tasks fa-fw fa-lg text-secondary"></i>
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="font-bold">Task created by John Doe</span>
                                <span className="">TODO: link tasks</span>
                            </div>
                        </div>
                        <span className="badge badge-secondary badge-sm ml-auto">{formatDistanceToNow(createdAt)}</span>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default RecentActivity;