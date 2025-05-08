
export const PROJECT_STATUS_OPTIONS = [
    { value: "new", label: "New", badge: "badge-primary", icon: "fas fa-plus" },
    { value: "approved", label: "Approved", badge: "badge-primary", icon: "fas fa-check" },
    { value: "planning", label: "Planning", badge: "badge-primary", icon: "fas fa-calendar-alt" },
    { value: "in_progress", label: "In Progress", badge: "badge-info", icon: "fas fa-spinner" },
    { value: "on_hold", label: "On Hold", badge: "badge-warning", icon: "fas fa-pause" },
    { value: "completed", label: "Completed", badge: "badge-success", icon: "fas fa-check-circle" },
    { value: "cancelled", label: "Cancelled", badge: "badge-error", icon: "fas fa-times" },
];

export const PROJECT_STATUSES = Object.fromEntries(
    PROJECT_STATUS_OPTIONS.map((status) => [status.value, status.label])
);


export const getProjectStatusMeta = (status) => {
    const statusMeta = PROJECT_STATUS_OPTIONS.find((s) => s.value === status);
    return statusMeta || { label: "Unknown", badge: "badge-secondary", icon: "fas fa-question" };
}