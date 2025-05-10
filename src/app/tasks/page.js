import { Filter } from "./components/filter";
import { Pagination } from "./components/pagination";
import { Header } from "./components/header";

import { getTasks, getTaskCounts } from "./actions/queries";
import { Card } from "./components/card";
import { Table } from "./components/table";
import { getTaskStatusMeta } from "@/lib/enums";

export const TasksPage = async ({ searchParams }) => {
    let { view, page, filter } = await searchParams || {};
    view = view || "grid";
    page = Number(page) || 1;
    filter = filter || "all";

    const pageSize = 10;
    let graphqlQuery = {};

    if (filter && filter !== "all") {
        graphqlQuery = { status_eq: filter };
    }

    const counts = await getTaskCounts();

    const results = await getTasks({
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
                            <i className="far fa-list-check text-xl text-neutral"></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.total.count}</p>
                            <p className="text-sm font-semibold mb-0">Total Tasks</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getTaskStatusMeta("pending").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getTaskStatusMeta("pending").icon} text-xl ${getTaskStatusMeta("pending").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.pending.count}</p>
                            <p className="text-sm font-semibold mb-0">Pending</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getTaskStatusMeta("in_progress").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getTaskStatusMeta("in_progress").icon} text-xl ${getTaskStatusMeta("in_progress").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.inProgress.count}</p>
                            <p className="text-sm font-semibold mb-0">In Progress</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getTaskStatusMeta("completed").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getTaskStatusMeta("completed").icon} text-xl ${getTaskStatusMeta("completed").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.completed.count}</p>
                            <p className="text-sm font-semibold mb-0">Completed</p>
                        </div>
                    </div>
                </div>
            </div>
            <Header />
            <Filter currentView={view} currentFilter={filter} />
            {data.length === 0 ? (
                <div className="w-full text-center py-8">
                    <div className="card bg-base-100 shadow-lg p-8">
                        <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                        <p className="mb-4">There are no tasks matching your current filter criteria.</p>
                        <a href="/tasks/new" className="btn btn-primary mx-auto">
                            <i className="fas fa-plus mr-2" />New Task
                        </a>
                    </div>
                </div>
            ) : view === "grid" ? (
                <div className="w-full">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((task, index) => (
                            <Card key={index} task={task} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="min-w-full">
                    <Table tasks={data} />
                </div>
            )}
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
};

export default TasksPage;