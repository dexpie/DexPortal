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
                next: { revalidate: 3600 },
            }
        );

        if (!userResponse.ok) {
            throw new Error(`GitHub API error: ${userResponse.status}`);
        }

        const user = await userResponse.json();

        // Fetch repos to calculate stats
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
                next: { revalidate: 3600 },
            }
        );

        const repos = await reposResponse.json();

        // Calculate Total Stars
        const totalStars = repos.reduce(
            (sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count,
            0
        );

        // Calculate Languages
        const languages: Record<string, number> = {};
        let totalReposWithLang = 0;

        repos.forEach((repo: { language: string }) => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
                totalReposWithLang++;
            }
        });

        // Convert to percentage and sort
        const topLanguages = Object.entries(languages)
            .map(([lang, count]) => ({
                name: lang,
                percentage: Math.round((count / totalReposWithLang) * 100),
                count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 4); // Top 4 languages

        // Mock Contribution Heatmap (simulated for now based on recent activity volume)
        // In a real app we'd scrape or use GraphQL API for exact contributions
        const heatmapData = Array.from({ length: 52 * 7 }).map(() =>
            Math.random() > 0.8 ? Math.floor(Math.random() * 4) : 0
        );

        return NextResponse.json({
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            totalStars,
            topLanguages,
            heatmapData
        });
    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch GitHub stats" },
            { status: 500 }
        );
    }
}
