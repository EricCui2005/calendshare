import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: any)
{
    try {

        // Extracting username and serialized event object from request
        const url = new URL(request.url, `http://${request.headers.host}`);
        const user = url.searchParams.get('user')

        // Bad request catching
        if (!user) {
            return NextResponse.json({error: "Username parameter required", status: 400});
        }

        // Querying and cnostructing response
        const result = await sql`SELECT * FROM events WHERE name = ${user}`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}