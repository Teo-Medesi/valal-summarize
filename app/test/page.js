"use client"
import Protected from "../components/Restricted"
import CodeBlock from "../user/api/example"

export default function Test() {
  return <CodeBlock />
}

/* const response = await fetch("http://localhost:3000/api/private/extract", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": JSON.stringify({
      API_key: process.env.API_KEY,
      user_id: process.env.USER_ID
    })
  },
  body: JSON.stringify({url: "http://example.com"})
});

const data = await response.json(); */