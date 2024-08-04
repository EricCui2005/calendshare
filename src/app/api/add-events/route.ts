import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: any)
{
    try {

        // Extracting username and serialized event object from request
        const { user, events } = await request.json();

        // Bad request catching
        if (!user) {
            return NextResponse.json({error: "Username parameter required", status: 400});
        }
        if (!events) {
            return NextResponse.json({error: "Events parameter required", status: 400});
        }

        // Querying and cnostructing response
        const result = await sql`UPDATE events SET data = ${events} WHERE name = ${user}`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}