import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

// user_id = params.id  /api/private/users/[id]/

export async function GET(request, { params }) {
  try {

    const access_response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/token`);
    const { access_token } = await access_response.json();

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${params.id}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${access_token}`, 'Content-Type': 'application/json' },
    });

    const user = await response.json();

    return NextResponse.json(user, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
} 