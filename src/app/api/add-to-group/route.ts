import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest} from 'next/server';

export async function POST(request: NextRequest) {
    try {

        // Destructuring
        const { groupName, groupPassword, personId } = await request.json();

        // Missing parameter error catching
        if (!groupName) {
            return NextResponse.json({ error: "Group name parameter required", status: 400 });
        }
        if (!groupPassword) {
            return NextResponse.json({ error: "Group password parameter required", status: 400 });
        }
        if (!personId) {
            return NextResponse.json( { error: "No personId provided", status: 400 });
        }

        // Querying for a group
        const groupResult = await sql `SELECT groupid FROM groups WHERE groupname = ${groupName} AND grouppassword = ${groupPassword}`;

        // Invalid credentials
        if (groupResult.rowCount == 0) {
            return NextResponse.json( { error: "Invalid group name and password"}, { status: 400 });
        } 

        // Logging current user as having group membership
        const groupId = groupResult.rows[0].groupid;
        const groupAdd = await sql `INSERT INTO groupmemberships VALUES(${groupId}, ${personId})`;

        return NextResponse.json(groupAdd, {status: 200});

    } catch (error: any) {
        return NextResponse.json({ error: error.message}, { status: 500 });
    }
}
