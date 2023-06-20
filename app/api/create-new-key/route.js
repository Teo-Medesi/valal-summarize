import { NextResponse } from "next/server";
/* 
  POST /api/create-new-key HTTP/1.1

  in order to create a new key, we need the user profile for who to update
*/
export async function POST(request) {
  try {
    const body = await request.json();
    const key = crypto.randomUUID();

    await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${body.user.sub}`, {
      method: 'PATCH',
      headers: { authorization: 'Bearer ABCD', 'content-type': 'application/json' },
      data: { user_metadata: { auth: { API_Key: key } } }
    });

    return NextResponse.json({ message: "success", key, user: body.user }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}