import { Filter } from "./components/filter";
import { Pagination } from "./components/pagination";
import { Header } from "./components/header";

import { getProjects } from "./actions/queries";
import { Card } from "./components/card";
import { Table } from "./components/table";

export const ProjectsPage = async ({ searchParams }) => {
    const view = (await searchParams)?.view || "grid";
    const page = (await searchParams)?.page || 1;
    const pageSize = 2;

    const results = await getProjects({
        options: {
            filter: null,
            sort: { createdAt: "DESC" },
            paging: { offset: Number(page), limit: Number(pageSize) },
        },
    });

    const totalCount = results.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);
    const currentPage = Number(page) > totalPages ? totalPages : Number(page);
    const data = results.data || [];

    return (
        <div className="space-y-6">
            <Header />
            <Filter currentView={view} />
            {view === "grid" ? (
                <div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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