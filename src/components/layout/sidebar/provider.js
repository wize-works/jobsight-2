"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";


const SidebarContext = createContext({
    isCollapsed: false,
    toggleSidebar: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        // Function to check if the device is mobile
        const checkMobile = () => {
            return window.innerWidth < 768; // 768px is the 'md' breakpoint in Tailwind
        };

        // Set initial state based on screen size
        setIsCollapsed(checkMobile());

        // Add resize listener
        const handleResize = () => {
            setIsCollapsed(checkMobile());
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        console.log("Sidebar toggled");
        // Use functional update to ensure we always have the latest state
        setIsCollapsed(prevState => !prevState);
    }

    return <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>
}
