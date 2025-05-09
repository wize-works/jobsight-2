import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-organization';

export const createNewClient = async (client) => {
    const query = `
        mutation ($input: Client!) {
            createClient(input: $input) {
                _id
                name
                contactPerson
                email
                status
                createdAt
                updatedAt
            }
        }
    `;
    const data = await executeGraphQL(service, query, { input: client });

    if (data && data.createClient) {
        return data.createClient;
    }
    else {
        throw new Error('Failed to create client');
    }
};

export const updateClient = async (id, client) => {
    const query = `
        mutation ($id: ID!, $input: Client!) {
            updateClient(id: $id, input: $input) {
                _id
                name
                contactPerson
                email
                status
                createdAt
                updatedAt
            }
        }
    `;
    const data = await executeGraphQL(service, query, { id, input: client });

    if (data && data.updateClient) {
        return data.updateClient;
    }
    else {
        throw new Error('Failed to update client');
    }
};