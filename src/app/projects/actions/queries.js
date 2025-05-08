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
                status
                progress
                description
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