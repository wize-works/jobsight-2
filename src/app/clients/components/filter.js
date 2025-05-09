'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Filter = ({ currentView, currentFilter }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [view, setView] = useState(currentView || "grid");
    const [filter, setFilter] = useState(currentFilter || {});

    useEffect(() => {
        const storedView = localStorage.getItem('clients_view');
        const storedFilter = localStorage.getItem('clients_filter');
        const params = new URLSearchParams(searchParams.toString());

        let updated = false;

        if (!params.has('view') && storedView && storedView !== currentView) {
            setView(storedView);
            params.set('view', storedView);
            updated = true;
        }
        if (!params.has('filter') && storedFilter && storedFilter !== currentFilter) {
            setFilter(storedFilter);
            params.set('filter', storedFilter);
            updated = true;
        }

        if (updated) {
            router.replace(`?${params.toString()}`);
        }
    }, [searchParams, router, currentView, currentFilter]);

    const handleViewChange = (newView) => {
        setView(newView);
        localStorage.setItem('clients_view', newView);
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', newView);
        router.push(`?${params.toString()}`);
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        localStorage.setItem('clients_filter', newFilter);
        const params = new URLSearchParams(searchParams.toString());
        params.set('filter', newFilter);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="flex bg-base-100 py-1 px-2 rounded-lg shadow-md items-center justify-between">
            <div className="flex items-center gap-4">
                <label className="input">
                    <i className="far fa-magnifying-glass"></i>
                    <input type="search" placeholder="Search..." className="input input-bordered w-full border-0 focus:border-0" />
                </label>
                <details className="dropdown">
                    <summary className="btn"><i className="far fa-filter" /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 shadow-sm">
                        <li><a onClick={() => handleFilterChange("all")}>All</a></li>
                        <li><a onClick={() => handleFilterChange("active")}>Active</a></li>
                        <li><a onClick={() => handleFilterChange("inactive")}>Inactive</a></li>
                        <li><a onClick={() => handleFilterChange("prospect")}>Prospect</a></li>
                        <li><a onClick={() => handleFilterChange("archived")}>Archived</a></li>
                    </ul>
                </details>
            </div>
            <div className="flex items-center space-x-4">
                View:
                <div role="tablist" className="tabs tabs-box ml-2">
                    <a role="tab" className={`tab ${currentView === "grid" && "tab-active"}`} onClick={() => handleViewChange("grid")}><i className="far fa-grid-2 fa-lg" /></a>
                    <a role="tab" className={`tab ${currentView === "list" && "tab-active"}`} onClick={() => handleViewChange("list")}><i className="far fa-list fa-lg" /></a>
                </div>
            </div>
        </div>
    );
}