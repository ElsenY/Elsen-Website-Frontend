// app/api/game/submit-score/route.ts
import { safeFetch } from "@/app/utils/api";
import { encrypt } from "@/app/utils/crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const stringKey = process.env.CLIENT_SECRET || "my-secret-key";
    const encMeta = encrypt(body.score.toString(), stringKey); 
    
    // Forward request to Spring Boot
    const res = await safeFetch(`${process.env.BACKEND_URL}/game/score`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": req.headers.get("cookie") || ""
        },
        body: JSON.stringify({
            token: body.token,
            meta: encMeta,
            score: body.score,
        }),
    });

    const data = await res.json();

    // Forward response back to browser
    return NextResponse.json(data, { status: res.status, });
}

export async function GET(req: Request) {
    const res = await safeFetch(`${process.env.BACKEND_URL}/game/score`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status, });
}