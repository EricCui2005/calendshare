import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: any)
{
    try {

        // Extracting username and serialized event object from request
        const url = new URL(request.url);
        const username = url.searchParams.get('username');
        const password = url.searchParams.get('password');

        // Bad request catching
        if (!username) {
            return NextResponse.json({ error: "Username parameter required", status: 400 });
        }
        if (!password) {
            return NextResponse.json({ error: "Password parameter required", status: 400 })
        }

        // Querying and cnostructing response
        const result = await sql`SELECT personid FROM persons WHERE name = ${username} AND password = ${password}`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}