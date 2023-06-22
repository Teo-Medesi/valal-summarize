import { NextResponse } from "next/server";

// user_id = params.id  /api/users/[id]/

export async function GET(request, { params }) {
  try {
    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${params.id}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`, 'Content-Type': 'application/json' },
    });

    const user = await response.json();

    return NextResponse.json(user, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
} 