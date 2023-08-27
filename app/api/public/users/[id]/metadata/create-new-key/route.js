import { NextResponse } from "next/server";
/* 
  POST /api/create-new-key HTTP/1.1

  user_id required in body

  WORKING
*/
export async function POST(request, { params }) {
  try {
    const key = crypto.randomUUID();

    const { searchParams } = new URL(request.URL);
    const token = searchParams.get("token");

    const response = await fetch(`https://dev-ul7phc0o5syw4wwp.us.auth0.com/api/v2/users/${params.id}`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_metadata: { auth: { API_key: key } } })
    });

    return NextResponse.json({ message: "Successfully created new API key.", key }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}