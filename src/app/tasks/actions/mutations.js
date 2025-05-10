import { executeGraphQL } from "@/lib/execute-graphql";
const service = 'wize-task';

export const createNewTask = async (task) => {
    const query = `
        mutation ($input: TaskInput!) {
            createTask(input: $input) {
                _id
                title
                status
                priority
                createdAt
                updatedAt
            }
        }
    `;
    const data = await executeGraphQL(service, query, { input: task });

    if (data && data.createTask) {
        return data.createTask;
    }
    else {
        throw new Error('Failed to create task');
    }
};

export const updateTask = async (id, task) => {
    const query = `
        mutation ($id: ID!, $input: TaskInput!) {
            updateTask(id: $id, input: $input) {
                _id
                title
                status
                priority
                createdAt
                updatedAt
            }
        }
    `;
    console.log('updateTask', id, task);
    const data = await executeGraphQL(service, query, { id, input: task });

    if (data && data.updateTask) {
        return data.updateTask;
    }
    else {
        throw new Error('Failed to update task');
    }
};

export const deleteTask = async (id) => {
    const query = `
        mutation ($id: ID!) {
            deleteTask(id: $id) {
                _id
                title
            }
        }
    `;
    const data = await executeGraphQL(service, query, { id });

    if (data && data.deleteTask) {
        return data.deleteTask;
    }
    else {
        throw new Error('Failed to delete task');
    }
};

export const toggleSubtaskCompletion = async (taskId, subtaskIndex, completed) => {
    const query = `
        mutation ($id: ID!, $input: TaskInput!) {
            updateTask(id: $id, input: $input) {
                _id
                title
                subtasks {
                    title
                    completed
                }
            }
        }
    `;

    // First get the current task data
    const getTask = `
        query ($id: ID!) {
            findTaskById(id: $id) {
                subtasks {
                    title
                    completed
                }
            }
        }
    `;

    const taskData = await executeGraphQL(service, getTask, { id: taskId });

    if (!taskData || !taskData.findTaskById) {
        throw new Error('Failed to fetch task data');
    }

    // Update the specific subtask completion status
    const subtasks = [...taskData.findTaskById.subtasks];
    if (subtaskIndex >= 0 && subtaskIndex < subtasks.length) {
        subtasks[subtaskIndex].completed = completed;
    }

    // Update the task with the modified subtasks
    const data = await executeGraphQL(service, query, {
        id: taskId,
        input: { subtasks }
    });

    if (data && data.updateTask) {
        return data.updateTask;
    } else {
        throw new Error('Failed to toggle subtask completion');
    }
};

export const addComment = async (taskId, comment) => {
    const query = `
        mutation ($id: ID!, $input: TaskInput!) {
            updateTask(id: $id, input: $input) {
                _id
                comments {
                    id
                    content
                    createdBy
                    createdByName
                    createdAt
                }
            }
        }
    `;

    // First get the current task comments
    const getTask = `
        query ($id: ID!) {
            findTaskById(id: $id) {
                comments {
                    id
                    content
                    createdBy
                    createdByName
                    createdAt
                }
            }
        }
    `;

    const taskData = await executeGraphQL(service, getTask, { id: taskId });

    if (!taskData || !taskData.findTaskById) {
        throw new Error('Failed to fetch task data');
    }

    // Add the new comment to existing comments
    const comments = [
        ...(taskData.findTaskById.comments || []),
        comment
    ];

    // Update the task with the new comments array
    const data = await executeGraphQL(service, query, {
        id: taskId,
        input: { comments }
    });

    if (data && data.updateTask) {
        return data.updateTask;
    } else {
        throw new Error('Failed to add comment');
    }
};