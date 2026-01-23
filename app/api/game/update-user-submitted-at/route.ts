// app/api/game/update-user-submitted-at/route.ts
import { NextResponse } from "next/server";
import { safeFetch } from "@/app/utils/api";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await safeFetch(`${process.env.BACKEND_URL}/game/update-user-submitted-at`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": req.headers.get("cookie") || ""
    },
    body: JSON.stringify({
      token: body.token,
      player_name: body.player_name,  
    }),
  });

  const data = await res.json();

  // Forward response back to browser
  return NextResponse.json(data, { status: res.status, });
}
