import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: any)
{
    try {

        // Extracting username and serialized event object from request
        const { personId, events } = await request.json();

        // Bad request catching
        if (!personId) {
            return NextResponse.json({error: "Person id parameter required", status: 400});
        }
        if (!events) {
            return NextResponse.json({error: "Events parameter required", status: 400});
        }

        // Querying and cnostructing response
        const result = await sql `UPDATE persons
                                  SET events = ${events}
                                  WHERE personid = ${personId};`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}