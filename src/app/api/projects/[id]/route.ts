import { NextRequest, NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/projects";

type Context = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, context: Context) {
    const { id } = await context.params;

    try {
        const body = await req.json();
        await updateProject(id, body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: Context) {
    const { id } = await context.params;

    try {
        await deleteProject(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
