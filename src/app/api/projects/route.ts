import { NextRequest, NextResponse } from "next/server";
import { getProjects, addProject, Project } from "@/lib/projects";

export async function GET() {
    const projects = await getProjects();
    return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newProject: Project = {
            id: body.id || Math.random().toString(36).substr(2, 9),
            ...body
        };
        await addProject(newProject);
        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
    }
}
