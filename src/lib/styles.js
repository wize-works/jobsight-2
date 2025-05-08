export const getProgressColorClass = (percentage) => {
    if (percentage >= 75) return 'progress-success';
    if (percentage >= 50) return 'progress-accent';
    if (percentage >= 25) return 'progress-warning';
    return 'progress-error';
};

export const getRadialProgressColorClass = (percentage) => {
    if (percentage >= 75) return 'text-success';
    if (percentage >= 50) return 'text-accent';
    if (percentage >= 25) return 'text-warning';
    return 'radial-progress-error';
};

export const getBadgeColorClass = (status) => {
    switch (status) {
        case 'planning':
            return 'badge-primary';
        case 'active':
        case 'in_progress':
            return 'badge-success';
        case 'inactive':
        case 'on_hold':
            return 'badge-warning';
        case 'pending':
            return 'badge-warning';
        case 'completed':
            return 'badge-secondary'
        default:
            return 'badge-ghost';
    }
}