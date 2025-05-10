'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Pagination = ({ currentPage, totalPages }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [page, setPage] = useState(currentPage || 1);

    useEffect(() => {
        const storedPage = localStorage.getItem('tasks_page');
        if (!searchParams.has('page') && storedPage && storedPage !== currentPage) {
            setPage(storedPage);
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', storedPage);
            router.push(`?${params.toString()}`);
        }
    }, [searchParams, router, currentPage]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        localStorage.setItem('tasks_page', newPage);
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="join bg-base-100 py-1 px-2 rounded-lg shadow-md">
            <button
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
                className="join-item btn btn-sm"
            >
                Previous
            </button>
            {Array.from({ length: 5 }, (_, i) => {
                const pageNumber = page - 2 + i;
                if (pageNumber > 0 && pageNumber <= totalPages) {
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`join-item btn btn-sm ${pageNumber === page ? 'btn-active' : ''}`}
                        >
                            {pageNumber}
                        </button>
                    );
                }
                return null;
            })}
            <button
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="join-item btn btn-sm"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;