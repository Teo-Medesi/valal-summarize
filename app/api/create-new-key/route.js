import { NextResponse } from "next/server";
/* 
  POST /api/create-new-key HTTP/1.1

  in order to create a new key, we need the user profile for who to update
*/
export async function POST(request) {
  try {
    const body = await request.json();
    const key = crypto.randomUUID();

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${body.user.sub}`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${process.env.AUTH0_MANAGEMENT_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_metadata: { auth: { API_Key: key } } })
    });

    const data = await response.json();

    return NextResponse.json({ message: "success", key, user: body.user, data }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}