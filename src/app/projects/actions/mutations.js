import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-project';
export const createNewProject = async (project) => {
    const query = `
        mutation ($input: ProjectInput!) {
            createProject(input: $input) {
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
    const data = await executeGraphQL(service, query, { input: project });

    if (data && data.createProject) {
        return data.createProject;
    }
    else {
        throw new Error('Failed to create project');
    }
};

export const updateProject = async (id, project) => {
    const query = `
        mutation ($id: ID!, $input: ProjectInput!) {
            updateProject(id: $id, input: $input) {
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
    const data = await executeGraphQL(service, query, { id, input: project });

    if (data && data.updateProject) {
        return data.updateProject;
    }
    else {
        throw new Error('Failed to update project');
    }
};

