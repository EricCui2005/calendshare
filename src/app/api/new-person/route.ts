import { sql } from '@vercel/postgres';
import { NextResponse, NextRequest} from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {

        // Destructuring username
        const { username, password } = await request.json();

        // Username error catching
        if (!username) {
            return NextResponse.json({ error: "Username parameter required", status: 400});
        }

        // Querying and returning result

        const result = await sql `INSERT INTO persons (personId, name, password) VALUES(${uuidv4().toString()}, ${username}, ${password})`;
        return NextResponse.json(result, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message}, { status: 500 });
    }
}
