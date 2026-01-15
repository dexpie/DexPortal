import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/projects";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();
        const projects = await getProjects();

        const projectIndex = projects.findIndex((p) => p.id === id);
        if (projectIndex === -1) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        projects[projectIndex].likes = (projects[projectIndex].likes || 0) + 1;
        await saveProjects(projects);

        return NextResponse.json({ likes: projects[projectIndex].likes });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update likes" }, { status: 500 });
    }
}
