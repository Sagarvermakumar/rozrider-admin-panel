import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('token');

    // Optionally call backend logout if needed, but client usually just discards token.
    // We can fire and forget or just clear cookie.

    return NextResponse.json({ success: true, message: 'Logged out' });
}
