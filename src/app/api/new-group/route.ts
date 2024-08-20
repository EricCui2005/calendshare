import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest} from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {

        // Destructuring
        const { groupName, groupPassword } = await request.json();

        // Username error catching
        if (!groupName) {
            return NextResponse.json({ error: "Group name parameter required", status: 400});
        }

        // Querying and returning result
        const result = await sql `INSERT INTO groups (groupid, groupname, grouppassword) VALUES(${uuidv4().toString()}, ${groupName}, ${groupPassword})`;
        return NextResponse.json(result, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message}, { status: 500 });
    }
}
