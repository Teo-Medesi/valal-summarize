import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const response = await fetch("https://dev-ul7phc0o5syw4wwp.us.auth0.com/oauth/token", {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID, client_secret: process.env.AUTH0_MANAGEMENT_SECRET, audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE, grant_type: "client_credentials"})
    })

    const data = await response.json();

    return NextResponse.json(data, {status: 200});
}