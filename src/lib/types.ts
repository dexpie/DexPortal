export interface Project {
    id: string;
    title: string;
    description: string;
    href: string;
    category: "Web App" | "Tool" | "Experiment" | "Game";
    status: "Live" | "Development" | "Archived" | "Concept";
    previewImage?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
}

export interface GuestbookEntry {
    id: string;
    name: string;
    message: string;
    date: string;
}
