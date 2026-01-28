import fs from 'fs';
import path from 'path';
import { GuestbookEntry } from './types';

export { type GuestbookEntry };

const dataPath = path.join(process.cwd(), 'src', 'data', 'guestbook.json');

import { supabase } from './supabase';

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
    // 1. Try Supabase
    if (supabase) {
        const { data, error } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            return data.map(d => ({
                id: d.id,
                name: d.name,
                message: d.message,
                date: new Date(d.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                })
            }));
        }
    }

    // 2. Fallback to File System (Simulation Mode)
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
    if (supabase) {
        await supabase.from('guestbook').insert([{
            id: entry.id,
            name: entry.name,
            message: entry.message,
            created_at: new Date().toISOString()
        }]);
        return;
    }

    // Fallback
    const entries = await getGuestbookEntries();
    entries.unshift(entry); // Add to top
    await fs.promises.writeFile(dataPath, JSON.stringify(entries, null, 2));
}

export async function deleteGuestbookEntry(id: string) {
    if (supabase) {
        // Optional: Implement delete if you have auth
        return;
    }

    const entries = await getGuestbookEntries();
    const newEntries = entries.filter(e => e.id !== id);
    await fs.promises.writeFile(dataPath, JSON.stringify(newEntries, null, 2));
}
