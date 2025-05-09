import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-organization';

export const createNewClient = async (client) => {
    const query = `
        mutation ($input: ClientInput!) {
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
        mutation ($id: ID!, $input: ClientInput!) {
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

export const generateUploadUrl = async (fileName, type) => {
    const query = `
        mutation ($type: UploadType!, $fileName: String!) {
            generateUploadUrl(type: $type, fileName: $fileName) {
                uploadUrl
            }
        }
    `;

    const results = await executeGraphQL('wize-media', query, { fileName, type });

    return results.generateUploadUrl;
};

export const registerImage = async (fileName, mimeType, url) => {
    const query = `
        mutation ($input: ImageInput!) {
            registerImage(input: $input) {
                _id
                url
            }
        }
    `;

    const { registerImage } = await executeGraphQL('wize-media', query, {
        input: {
            fileName,
            mimeType,
            url,
        },
    });

    return registerImage;
};