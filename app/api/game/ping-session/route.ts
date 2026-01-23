// app/api/game/start-game/route.ts
import { NextResponse } from "next/server";
import { safeFetch } from "@/app/utils/api";
export async function POST(req: Request) {
  // Forward request to Spring Boot
  const res = await safeFetch(`${process.env.BACKEND_URL}/game/ping-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": req.headers.get("cookie") || ""
    },
    body: req.body,
  });

  const data = await res.json();

  // Forward response back to browser
  return NextResponse.json(data, { status: res.status, });
}
