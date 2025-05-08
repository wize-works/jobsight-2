"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";


const SidebarContext = createContext({
    isCollapsed: false,
    toggleSidebar: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        // Function to check if the device is mobile
        const checkMobile = () => {
            return window.innerWidth < 768; // 768px is the 'md' breakpoint in Tailwind
        };

        setIsCollapsed(checkMobile());

        const handleResize = () => {
            setIsCollapsed(checkMobile());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(prevState => !prevState);
    }

    return <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>{children}</SidebarContext.Provider>
}
