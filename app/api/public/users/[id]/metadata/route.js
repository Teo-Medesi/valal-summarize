import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();

    const access_response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/token`);
    const { access_token } = await access_response.json();

    if (!body.new_metadata || Object.keys(body.new_metadata).length === 0) return NextResponse.json({ error: "Missing new_metadata" })

    await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${params.id}`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_metadata: body.new_metadata })
    });

    return NextResponse.json({ message: "updated successfuly" }, { status: 200 })

  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

export async function GET(request, { params }) {
  try {

    const access_response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/token`);
    const { access_token } = await access_response.json();

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${params.id}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${access_token}`, 'Content-Type': 'application/json' },
    });

    const user = await response.json();

    return NextResponse.json({ app_metadata: user?.app_metadata || {}}, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}