import { Filter } from "./components/filter";
import { Pagination } from "./components/pagination";
import { Header } from "./components/header";

import { getProjects, getProjectCounts } from "./actions/queries";
import { Card } from "./components/card";
import { Table } from "./components/table";
import { getProjectStatusMeta } from "@/lib/enums";

export const ProjectsPage = async ({ searchParams }) => {
    let { view, page, filter } = await searchParams || {};
    view = view || "grid";
    page = Number(page) || 1;
    filter = filter || "all";

    const pageSize = 10;
    let graphqlQuery = {};

    if (filter && filter !== "all") {
        graphqlQuery = { status_eq: filter };
    }

    const counts = await getProjectCounts();

    const results = await getProjects({
        options: {
            filter: graphqlQuery,
            sort: { createdAt: "DESC" },
            paging: { offset: Number((page - 1) * pageSize), limit: Number(pageSize) },
        },
    });

    const totalCount = results.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = Number(page) > totalPages ? totalPages : Number(page);
    const data = results.data || [];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className="bg-neutral/20 rounded-full w-12 h-12 flex items-center justify-center">
                            <i className="far fa-calculator text-xl text-neutral"></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.total.count}</p>
                            <p className="text-sm font-semibold mb-0">Total Projects</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getProjectStatusMeta("planning").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getProjectStatusMeta("planning").icon} text-xl ${getProjectStatusMeta("planning").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.planning.count}</p>
                            <p className="text-sm font-semibold mb-0">Planning</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getProjectStatusMeta("in_progress").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getProjectStatusMeta("in_progress").icon} text-xl ${getProjectStatusMeta("in_progress").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.inProgress.count}</p>
                            <p className="text-sm font-semibold mb-0">In Progress</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getProjectStatusMeta("on_hold").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getProjectStatusMeta("on_hold").icon} text-xl ${getProjectStatusMeta("on_hold").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.onHold.count}</p>
                            <p className="text-sm font-semibold mb-0">On Hold</p>
                        </div>
                    </div>
                </div>
            </div>
            <Header />
            <Filter currentView={view} currentFilter={filter} />
            {view === "grid" ? (
                <div>
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((project, index) => (
                            <Card key={index} project={project} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <Table projects={data} />
                </div>
            )}
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
};

export default ProjectsPage;