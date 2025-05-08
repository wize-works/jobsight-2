import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-project';

export const getProjects = async ({ options = {} }) => {
    const query = `
        query ($filter: Filter, $sort: Sort, $paging: Paging) {
            findProjects(filter: $filter, sort: $sort, paging: $paging) {
                count
                data {
                    _id
                    name
                    status
                    address {
                        street
                        city
                        state
                        postalCode
                        country
                    }
                    progress
                    description
                    startDate
                    endDate
                    location
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
    if (data && data.findProjects) {
        return data.findProjects;
    } else {
        throw new Error('Failed to fetch projects');
    }
};

export const getProjectById = async (id) => {
    const query = `
        query ($id: ID!) {
            findProjectById(id: $id) {
                _id
                name
                address {
                    street
                    city
                    state
                    postalCode
                    country
                }
                location
                status
                progress
                description
                startDate
                endDate
                client
                budget
                createdAt
                updatedAt
            }
        }
    `;
    const data = await executeGraphQL(service, query, { id });
    if (data && data.findProjectById) {
        return data.findProjectById;
    } else {
        throw new Error('Failed to fetch project by ID');
    }
};

export const getProjectCounts = async () => {
    const query = `
        query {
            total: findProjects(filter: {}) {
                count
            }
            new: findProjects(filter: { status_eq: new}) {
                count
            }
            approved: findProjects(filter: { status_eq: approved}) {
                count
            }
            planning: findProjects(filter: { status_eq: planning}) {
                count
            }
            inProgress: findProjects(filter: { status_eq: in_progress}) {
                count
            }
            onHold: findProjects(filter: { status_eq: on_hold}) {
                count
            }
            completed: findProjects(filter: { status_eq: completed}) {
                count
            }
            cancelled: findProjects(filter: { status_eq: cancelled}) {
                count
            }
        }
    `;

    const data = await executeGraphQL(service, query, {});
    if (data) {
        return data;
    } else {
        throw new Error('Failed to fetch projects');
    }
};