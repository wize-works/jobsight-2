import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-organization';

export const getClients = async ({ options = {} }) => {
    const query = `
        query ($filter: ClientFilter, $sort: ClientSort, $paging: ClientPaging) {
            findClients(filter: $filter, sort: $sort, paging: $paging) {
                count
                data {
                    _id
                    name
                    contactPerson
                    email
                    phone
                    website
                    status
                    address {
                        street
                        city
                        state
                        postalCode
                        country
                    }
                    notes
                    logo
                    industry
                    tags
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
    if (data && data.findClients) {
        return data.findClients;
    } else {
        throw new Error('Failed to fetch clients');
    }
};

export const getClientById = async (id) => {
    const query = `
        query ($id: ID!) {
            findClientById(id: $id) {
                _id
                name
                contactPerson
                email
                phone
                website
                status
                address {
                    street
                    city
                    state
                    postalCode
                    country
                }
                notes
                logo
                industry
                tags
                createdAt
                updatedAt
            }
        }
    `;
    const data = await executeGraphQL(service, query, { id });
    if (data && data.findClientById) {
        return data.findClientById;
    } else {
        throw new Error('Failed to fetch client by ID');
    }
};

export const getClientCounts = async () => {
    const query = `
        query {
            total: findClients(filter: {}) {
                count
            }
            active: findClients(filter: { status_eq: active }) {
                count
            }
            inactive: findClients(filter: { status_eq: inactive }) {
                count
            }
            prospect: findClients(filter: { status_eq: prospect }) {
                count
            }
            archived: findClients(filter: { status_eq: archived }) {
                count
            }
        }
    `;

    const data = await executeGraphQL(service, query, {});
    if (data) {
        return data;
    } else {
        throw new Error('Failed to fetch clients');
    }
};