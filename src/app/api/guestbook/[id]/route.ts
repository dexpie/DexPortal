import { NextRequest, NextResponse } from "next/server";
import { deleteGuestbookEntry } from "@/lib/guestbook";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, context: Context) {
    const { id } = await context.params;

    try {
        // Basic auth check (only admin can delete)
        const adminSession = req.cookies.get("admin_session");
        if (!adminSession) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await deleteGuestbookEntry(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 });
    }
}
