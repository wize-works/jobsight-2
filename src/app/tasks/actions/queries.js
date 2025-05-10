import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-task';

export const getTasks = async ({ options = {} }) => {
    const query = `
        query ($filter: TaskFilter, $sort: TaskSort, $paging: TaskPaging) {
            findTasks(filter: $filter, sort: $sort, paging: $paging) {
                count
                data {
                    _id
                    title
                    description
                    status
                    assignedTo
                    assignedToName
                    projectId
                    projectName
                    priority
                    tags
                    subtasks {
                        title
                        completed
                    }
                    dueDate
                    isCritical
                    createdAt
                    updatedAt
                }
            }
        }
    `;
    const filter = options.filter || null;
    const sort = options.sort || { 'createdAt': 'desc' };
    const paging = options.paging || null;
    const refinedOptions = { filter, sort, paging };

    const data = await executeGraphQL(service, query, refinedOptions);
    if (data && data.findTasks) {
        return data.findTasks;
    } else {
        throw new Error('Failed to fetch tasks');
    }
};

export const getTaskById = async (id) => {
    const query = `
        query ($id: ID!) {
            findTaskById(id: $id) {
                _id
                title
                description
                status
                assignedTo
                assignedToName
                projectId
                projectName
                priority
                tags
                subtasks {
                    title
                    completed
                }
                attachments {
                    filename
                    url
                    size
                }
                estimatedHours
                actualHours
                comments {
                    id
                    content
                    createdBy
                    createdByName
                    createdAt
                }
                dueDate
                isCritical
                orderIndex
                createdAt
                updatedAt
                createdBy
            }
        }
    `;
    const data = await executeGraphQL(service, query, { id });
    if (data && data.findTaskById) {
        return data.findTaskById;
    } else {
        throw new Error('Failed to fetch task by ID');
    }
};

export const getTaskCounts = async () => {
    const query = `
        query {
            total: findTasks(filter: {}) {
                count
            }
            pending: findTasks(filter: { status_eq: pending }) {
                count
            }
            inProgress: findTasks(filter: { status_eq: in_progress }) {
                count
            }
            completed: findTasks(filter: { status_eq: completed }) {
                count
            }
            onHold: findTasks(filter: { status_eq: on_hold }) {
                count
            }
            cancelled: findTasks(filter: { status_eq: cancelled }) {
                count
            }
            blocked: findTasks(filter: { status_eq: blocked }) {
                count
            }
        }
    `;

    const data = await executeGraphQL(service, query, {});
    if (data) {
        return data;
    } else {
        throw new Error('Failed to fetch task counts');
    }
};

export const getProjectsForDropdown = async () => {
    const query = `
        query ($filter: ProjectFilter, $sort: ProjectSort, $paging: ProjectPaging) {
            findProjects(filter: $filter, sort: $sort, paging: $paging) {
                data {
                    _id
                    name
                }
            }
        }
    `;

    const data = await executeGraphQL('wize-project', query, {
        sort: { name: 'ASC' },
        paging: { limit: 50 }
    });

    if (data && data.findProjects) {
        return data.findProjects.data;
    } else {
        throw new Error('Failed to fetch projects for dropdown');
    }
};