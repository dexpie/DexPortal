import fs from 'fs';
import path from 'path';

export interface GuestbookEntry {
    id: string;
    name: string;
    message: string;
    date: string;
}

const dataPath = path.join(process.cwd(), 'src', 'data', 'guestbook.json');

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
    try {
        const fileContents = await fs.promises.readFile(dataPath, 'utf8');
        const entries = JSON.parse(fileContents);
        // Sort by date desc
        return entries.sort((a: GuestbookEntry, b: GuestbookEntry) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
        return [];
    }
}

export async function addGuestbookEntry(entry: GuestbookEntry) {
    const entries = await getGuestbookEntries();
    entries.unshift(entry); // Add to top
    await fs.promises.writeFile(dataPath, JSON.stringify(entries, null, 2));
}

export async function deleteGuestbookEntry(id: string) {
    const entries = await getGuestbookEntries();
    const newEntries = entries.filter(e => e.id !== id);
    await fs.promises.writeFile(dataPath, JSON.stringify(newEntries, null, 2));
}
