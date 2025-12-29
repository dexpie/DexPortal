export interface TimelineEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    project: string; // e.g., "DexKomik"
    type: "release" | "update" | "milestone";
}

export const timelineData: TimelineEvent[] = [
    {
        id: "0",
        date: "Dec 30, 2025",
        title: "DexAnime Release",
        description: "Launched the new anime streaming platform DexAnime.",
        project: "DexAnime",
        type: "release",
    },
    {
        id: "1",
        date: "Dec 28, 2025",
        title: "DexPortal Launch",
        description: "Official release of the central hub for the Dex Ecosystem.",
        project: "DexPortal",
        type: "release",
    },
    {
        id: "2",
        date: "Dec 25, 2025",
        title: "DexKomik v2.0",
        description: "Major UI overhaul and new reader engine implemented.",
        project: "DexKomik",
        type: "update",
    },
    {
        id: "3",
        date: "Dec 20, 2025",
        title: "DexPDF Cloud Sync",
        description: "Added support for Google Drive and Dropbox integration.",
        project: "DexPDF",
        type: "release",
    },
];
