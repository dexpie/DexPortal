import { NextRequest, NextResponse } from "next/server";
import { getGuestbookEntries, addGuestbookEntry, GuestbookEntry } from "@/lib/guestbook";

export async function GET() {
    const entries = await getGuestbookEntries();
    return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.name || !body.message) {
            return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
        }

        const newEntry: GuestbookEntry = {
            id: Math.random().toString(36).substr(2, 9),
            name: body.name,
            message: body.message,
            date: new Date().toISOString()
        };

        await addGuestbookEntry(newEntry);
        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to sign guestbook" }, { status: 500 });
    }
}
