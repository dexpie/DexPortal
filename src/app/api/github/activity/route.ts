import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const GITHUB_USERNAME = "dexpie";

export async function GET() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    // Authorization: `token ${process.env.GITHUB_TOKEN}`,
                },
                next: { revalidate: 0 }, // No cache for real-time
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events = await response.json();

        // Transform to simplified format
        const simplified = events.map((event: {
            id: string;
            type: string;
            repo: { name: string };
            created_at: string;
            payload?: { commits?: { message: string }[]; action?: string };
        }) => ({
            id: event.id,
            type: event.type,
            repo: { name: event.repo.name.split("/")[1] || event.repo.name },
            created_at: event.created_at,
            payload: event.payload,
        }));

        return NextResponse.json(simplified);
    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch GitHub activity" },
            { status: 500 }
        );
    }
}
