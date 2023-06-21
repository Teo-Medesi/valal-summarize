import { NextResponse } from "next/server";

// user_id, new metadata 

export async function PATCH(request) {
  try {
    const body = await request.json();

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${body.user_id}`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_metadata: body.metadata })
    });

    return NextResponse.json({ message: "updated successfuly" }, { status: 200 })

  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id");

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${id}`, {
      method: 'GET',
      headers: { "Authorization": `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`, 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}