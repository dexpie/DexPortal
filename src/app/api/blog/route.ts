import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, addBlogPost, BlogPost } from "@/lib/blog";

export async function GET() {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const newPost: BlogPost = {
            id: body.id || Math.random().toString(36).substr(2, 9),
            ...body
        };
        await addBlogPost(newPost);
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add blog post" }, { status: 500 });
    }
}
