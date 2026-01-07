import { NextRequest, NextResponse } from "next/server";
import { deleteBlogPost, getBlogPosts, saveBlogPosts } from "@/lib/blog";

type Context = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, context: Context) {
    const { id } = await context.params;

    try {
        const body = await req.json();
        const posts = await getBlogPosts();
        const index = posts.findIndex((p) => p.id === id);

        if (index !== -1) {
            posts[index] = { ...posts[index], ...body };
            await saveBlogPosts(posts);
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: Context) {
    const { id } = await context.params;

    try {
        await deleteBlogPost(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }
}
