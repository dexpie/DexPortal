export interface Repo {
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    homepage: string | null;
}

export async function getGithubRepos(username: string): Promise<Repo[]> {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
            next: { revalidate: 3600 },
            headers: {
                // Optional: Add GITHUB_TOKEN if available in env to increase rate limit
                ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` })
            }
        });

        if (!res.ok) {
            if (res.status === 403 || res.status === 429) {
                console.warn("⚠️ GitHub Rate Limit Exceeded. Using empty data.");
                return [];
            }
            throw new Error(`Failed to fetch GitHub repos: ${res.statusText}`);
        }

        const repos = await res.json();
        return repos.map((repo: any) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language,
            homepage: repo.homepage
        }));
    } catch (error) {
        console.error("GitHub Fetch Error:", error);
        return [];
    }
}
