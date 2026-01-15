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
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.error('Failed to fetch GitHub repos:', res.statusText);
            return [];
        }

        const repos: Repo[] = await res.json();

        // Filter and sort
        return repos
            .filter(repo => !repo.forks_count || repo.forks_count >= 0) // Keep all for now, maybe filter logic later
            .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
            .slice(0, 8); // Top 8
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}
