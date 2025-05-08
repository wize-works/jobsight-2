'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Filter = ({ currentView }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [view, setView] = useState(currentView || "grid");

    useEffect(() => {
        const storedView = localStorage.getItem('projects_view');
        if (!searchParams.has('view') && storedView && storedView !== currentView) {
            setView(storedView);
            const params = new URLSearchParams(searchParams.toString());
            params.set('view', storedView);
            router.push(`?${params.toString()}`);
        }
    }, [searchParams, router, currentView]);

    const handleViewChange = (newView) => {
        setView(newView);
        localStorage.setItem('projects_view', newView);
        const params = new URLSearchParams(searchParams.toString());
        params.set('view', newView);
        router.push(`?${params.toString()}`);
    }

    return (
        <div className="flex w-full bg-base-100 py-1 px-2 rounded-lg shadow-md items-center justify-between">
            <div className="flex items-center gap-4">
                <label className="input">
                    <i className="far fa-magnifying-glass"></i>
                    <input type="search" placeholder="Search..." className="input input-bordered w-full max-w-xs border-0 focus:border-0" />
                </label>
                <details className="dropdown">
                    <summary className="btn"><i className="far fa-filter" /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 shadow-sm">
                        <li><a>TODO: Add Filters</a></li>
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