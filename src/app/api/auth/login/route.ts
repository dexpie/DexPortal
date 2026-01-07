import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (username === "dexpie" && password === "frieren12") {
            const response = NextResponse.json({ success: true });

            // Set a secure cookie
            response.cookies.set("admin_session", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });

            return response;
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
