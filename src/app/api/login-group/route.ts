import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: any)
{
    try {

        // Extracting username and serialized event object from request
        const url = new URL(request.url);
        const groupName = url.searchParams.get('groupName');
        const groupPassword = url.searchParams.get('groupPassword');

        // Bad request catching
        if (!groupName) {
            return NextResponse.json({ error: "Group name parameter required", status: 400 });
        }
        if (!groupPassword) {
            return NextResponse.json({ error: "Group password parameter required", status: 400 })
        }

        // Querying and cnostructing response
        const result = await sql`SELECT groupid FROM groups WHERE groupname = ${groupName} AND grouppassword = ${groupPassword}`;
        const groupRow = result.rows[0];
        return NextResponse.json(groupRow, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}