// app/api/game/start-game/route.ts
import { safeFetch } from "@/app/utils/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Forward request to Spring Boot
  const resp = await safeFetch(`${process.env.BACKEND_URL}/game/start-game`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": req.headers.get("cookie") || ""
    }
  });

  const data = await resp.text();
   // Forward Set-Cookie from backend
   const setCookie = resp.headers.get("set-cookie");

   const response = NextResponse.json(
     { message: data },
     { status: resp.status }
   );
 
   if (setCookie) {
     response.headers.set("Set-Cookie", setCookie);
   }
  

  // Forward response back to browser
  return response;
}
