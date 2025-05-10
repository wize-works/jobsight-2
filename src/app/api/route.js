import { NextResponse } from 'next/server';
import { executeGraphQL } from '@/lib/execute-graphql';

export const POST = async (req) => {
    try {
        const { server, query, variables } = await req.json();

        if (!query) {
            return NextResponse.json({ error: 'Missing GraphQL query' }, { status: 400 });
        }

        const data = await executeGraphQL(server, query, variables || {});
        return NextResponse.json({ data });
    } catch (error) {
        console.error(`[${server}] Proxy error:`, error);
        return NextResponse.json(
            { error: error.message || 'Unexpected server error' },
            { status: 500 }
        );
    }
}
