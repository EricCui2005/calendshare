import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: any)
{
    try {

        // Destructuring groupId
        const url = new URL(request.url);
        const groupId = url.searchParams.get('groupId');

        
        // Bad request catching
        if (!groupId) {
            return NextResponse.json({error: "Group ID parameter required", status: 400});
        }

        // Querying and cnostructing response
        const result = await sql`SELECT p.personId, p.name, p.events
                                 FROM persons p
                                 JOIN groupmemberships gm ON p.personId = gm.personId
                                 WHERE gm.groupid = ${groupId};`;
        const memberRows = result.rows;

        return NextResponse.json(memberRows, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}