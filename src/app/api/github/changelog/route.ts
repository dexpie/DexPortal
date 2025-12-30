import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Define repositories to track
const REPOS = [
    "dexpie/DexPortal",
    "dexpie/DexAnime",
    "dexpie/DexKomik",
    "dexpie/DexPDF",
    "dexpie/DexAutoEDA",
    "dexpie/DexFileManager",
    "dexpie/DexKasir",
    "dexpie/DexScrapper",
];

interface Commit {
    sha: string;
    commit: {
        message: string;
        author: {
            date: string;
        };
    };
    html_url: string;
}

export async function GET() {
    try {
        // Fetch latest commits from each repo (2 per repo)
        const commitPromises = REPOS.map(async (repo) => {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${repo}/commits?per_page=2`,
                    {
                        headers: {
                            Accept: "application/vnd.github.v3+json",
                        },
                        next: { revalidate: 0 },
                    }
                );

                if (!response.ok) return [];

                const commits: Commit[] = await response.json();
                return commits.map((commit) => ({
                    id: commit.sha.slice(0, 7),
                    date: commit.commit.author.date,
                    title: commit.commit.message.split("\n")[0].slice(0, 60),
                    description: commit.commit.message.split("\n")[0],
                    project: repo.split("/")[1],
                    type: commit.commit.message.startsWith("feat") ? "release" : "update",
                    url: commit.html_url,
                }));
            } catch {
                return [];
            }
        });

        const allCommits = await Promise.all(commitPromises);
        const flatCommits = allCommits.flat();

        // Sort by date (newest first) and take top 10
        const sorted = flatCommits
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);

        return NextResponse.json(sorted);
    } catch (error) {
        console.error("Changelog API error:", error);
        return NextResponse.json(
            { error: "Failed to fetch changelog" },
            { status: 500 }
        );
    }
}
