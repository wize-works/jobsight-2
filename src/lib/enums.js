
export const PROJECT_STATUS_OPTIONS = [
    { value: "new", label: "New", badge: "badge-primary", icon: "far fa-plus", iconColor: "text-primary", iconBackground: "bg-primary/20" },
    { value: "pending", label: "Pending", badge: "badge-warning", icon: "far fa-clock", iconColor: "text-warning", iconBackground: "bg-warning/20" },
    { value: "approved", label: "Approved", badge: "badge-primary", icon: "far fa-check", iconColor: "text-primary", iconBackground: "bg-primary/20" },
    { value: "planning", label: "Planning", badge: "badge-primary", icon: "far fa-calendar-alt", iconColor: "text-primary", iconBackground: "bg-primary/20" },
    { value: "in_progress", label: "In Progress", badge: "badge-info", icon: "far fa-loader", iconColor: "text-info", iconBackground: "bg-info/20" },
    { value: "on_hold", label: "On Hold", badge: "badge-warning", icon: "far fa-pause", iconColor: "text-warning", iconBackground: "bg-warning/20" },
    { value: "completed", label: "Completed", badge: "badge-success", icon: "far fa-check-circle", iconColor: "text-success", iconBackground: "bg-success/20" },
    { value: "cancelled", label: "Cancelled", badge: "badge-error", icon: "far fa-times", iconColor: "text-error", iconBackground: "bg-error/20" },
];

export const PROJECT_STATUSES = Object.fromEntries(
    PROJECT_STATUS_OPTIONS.map((status) => [status.value, status.label])
);


export const getProjectStatusMeta = (status) => {
    const statusMeta = PROJECT_STATUS_OPTIONS.find((s) => s.value === status);
    return statusMeta || { label: "Unknown", badge: "badge-neutral", icon: "fas fa-question", iconColor: "text-neutral", iconBackground: "bg-neutral/20" };
}