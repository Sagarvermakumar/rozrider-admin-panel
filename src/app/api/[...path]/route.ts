import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = 'https://rozzride.com/api';

export async function GET(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}
export async function POST(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}
export async function PUT(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}
export async function DELETE(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
    return proxy(request, await params);
}

async function proxy(request: Request, params: { path: string[] }) {
    const path = params.path.join('/');

    // Prevent infinite loop if path starts with 'api' again (should not happen with this folder structure but good to be safe)
    // Our path is relative to /api/[...path], so 'admin/users' comes in as ['admin', 'users']

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const body = request.method !== 'GET' && request.method !== 'HEAD'
            ? await request.text()
            : undefined;

        const res = await fetch(`${API_URL}/${path}`, {
            method: request.method,
            headers,
            body,
        });

        const contentType = res.headers.get('content-type');
        let responseData;

        if (contentType && contentType.includes('application/json')) {
            responseData = await res.json();
        } else {
            responseData = await res.text();
        }

        // If 401, maybe clear cookie?
        if (res.status === 401) {
            // cookieStore.delete('token'); // Can't set cookies in a simple return unless we use NextResponse with headers.
            // But we can let the client handle the 401.
        }

        return NextResponse.json(responseData, { status: res.status });
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json({ message: 'Proxy Error' }, { status: 500 });
    }
}
