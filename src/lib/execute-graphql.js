const API_KEY = process.env.WIZE_API_KEY;

export const deepClean = (value) => {
    if (Array.isArray(value)) {
        return value
            .map(deepClean)
            .filter(
                v =>
                    v !== null &&
                    v !== undefined &&
                    (typeof v !== 'object' || Object.keys(v).length > 0)
            );
    }

    if (typeof value === 'object' && value !== null) {
        const cleaned = Object.fromEntries(
            Object.entries(value)
                .map(([k, v]) => [k, deepClean(v)])
                .filter(([_, v]) => v !== '' && v !== undefined && v !== null)
        );

        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
    }

    return value;
}

export const executeGraphQL = async (service, query, variables = {}) => {
    if (!API_KEY) {
        throw new Error('API key is not defined. Please set the WIZE_API_KEY environment variable.');
    }

    try {
        const cleanedVariables = await deepClean(variables);

        //let API_URL = `https://api.wize.works/${service}/graphql`;
        let API_URL = "http://localhost:3005/graphql"; // For local development
        const body = JSON.stringify({
            query: query,
            variables: cleanedVariables, //deepClean(variables),
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'wize-api-key': API_KEY,
            },
            body: body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API Error:', errorData);
            throw new Error(errorData.message || 'Project API request failed');
        }

        const responseJson = await response.json();
        const { data, errors } = responseJson;

        if (errors && errors.length > 0) {
            console.error('❌ GraphQL Errors:', errors);
            throw new Error(errors[0].message || 'GraphQL operation failed');
        }

        return data;
    } catch (error) {
        console.error(`❌ ${service} service error:`, error);
        throw error;
    }
}