import { Filter } from "./components/filter";
import { Pagination } from "./components/pagination";
import { Header } from "./components/header";
import { getClients, getClientCounts } from "./actions/queries";
import { Card } from "./components/card";
import { Table } from "./components/table";
import { getClientStatusMeta } from "@/lib/enums";
import Link from "next/link";

export const ClientsPage = async ({ searchParams }) => {
    let { view, page, filter } = await searchParams || {};
    view = view || "grid";
    page = Number(page) || 1;
    filter = filter || "all";

    const pageSize = 10;
    let graphqlQuery = {};

    if (filter && filter !== "all") {
        graphqlQuery = { status_eq: filter };
    }

    const counts = await getClientCounts();

    const results = await getClients({
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
                            <i className="far fa-building text-xl text-neutral"></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.total.count}</p>
                            <p className="text-sm font-semibold mb-0">Total Clients</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getClientStatusMeta("active").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getClientStatusMeta("active").icon} text-xl ${getClientStatusMeta("active").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.active.count}</p>
                            <p className="text-sm font-semibold mb-0">Active</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getClientStatusMeta("inactive").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getClientStatusMeta("inactive").icon} text-xl ${getClientStatusMeta("inactive").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.inactive.count}</p>
                            <p className="text-sm font-semibold mb-0">Inactive</p>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-lg p-6">
                    <div className="flex flex-row items-center">
                        <div className={`${getClientStatusMeta("prospect").iconBackground} rounded-full w-12 h-12 flex items-center justify-center`}>
                            <i className={`${getClientStatusMeta("prospect").icon} text-xl ${getClientStatusMeta("prospect").iconColor}`}></i>
                        </div>
                        <div className="flex flex-col items-left ml-2">
                            <p className="text-3xl font-bold">{counts.prospect.count}</p>
                            <p className="text-sm font-semibold mb-0">Prospects</p>
                        </div>
                    </div>
                </div>
            </div>
            <Header />
            <Filter currentView={view} currentFilter={filter} />

            {data.length === 0 ? (
                <div className="w-full text-center py-8">
                    <div className="card bg-base-100 shadow-lg p-8">
                        <h3 className="text-lg font-semibold mb-2">No clients found</h3>
                        <p className="mb-4">There are no clients matching your current filter criteria.</p>
                        <Link href="/clients/new" className="btn btn-primary mx-auto">
                            <i className="fas fa-plus mr-2" />New Client
                        </Link>
                    </div>
                </div>
            ) : view === "grid" ? (
                <div className="w-full">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((client, index) => (
                            <Card key={index} client={client} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="min-w-full">
                    <Table clients={data} />
                </div>
            )}

            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
};

export default ClientsPage;