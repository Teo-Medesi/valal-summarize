import { NextResponse } from "next/server";
/* 
  POST /api/create-new-key HTTP/1.1

  user_id required in body

  WORKING
*/
export async function POST(request, { params }) {
  try {
    const key = crypto.randomUUID();

    const access_response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/token`);
    const { access_token } = await access_response.json();

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${params.id}`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_metadata: { auth: { API_key: key } } })
    });

    return NextResponse.json({ message: "Successfully created new API key.", key }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}