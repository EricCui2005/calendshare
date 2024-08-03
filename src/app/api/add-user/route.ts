import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: any)
{
    try {

        // Extracting username from request body and validating
        const { username } = await request.json();
        if (!username) {
            return NextResponse.json({error: "Username parameter required", status: 400});
        }
        console.log(`Creating a new user with the username ${username}`);

        // Querying and cnostructing response
        const result = await sql`INSERT INTO test VALUES(${username}, 'Hello, Im Jacob')`;
        return NextResponse.json(result, {status: 200});
    } catch (error: any) { // Error catching
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}