import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

const GITHUB_USERNAME = "dexpie";

export async function GET() {
    try {
        // Fetch user profile
        const userResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 0 }, // No cache
            }
        );

        if (!userResponse.ok) {
            throw new Error(`GitHub API error: ${userResponse.status}`);
        }

        const user = await userResponse.json();

        // Fetch repos to calculate total stars
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 0 },
            }
        );

        const repos = await reposResponse.json();
        const totalStars = repos.reduce(
            (sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count,
            0
        );

        return NextResponse.json({
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            totalStars,
        });
    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch GitHub stats" },
            { status: 500 }
        );
    }
}
