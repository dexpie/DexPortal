import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/visitors.json");

async function getVisitorCount(): Promise<number> {
    try {
        const data = await fs.readFile(DATA_FILE, "utf-8");
        return JSON.parse(data).count || 0;
    } catch {
        return 0;
    }
}

async function incrementVisitorCount(): Promise<number> {
    const count = await getVisitorCount();
    const newCount = count + 1;
    await fs.writeFile(DATA_FILE, JSON.stringify({ count: newCount, lastUpdated: new Date().toISOString() }));
    return newCount;
}

export async function GET() {
    const count = await getVisitorCount();
    return NextResponse.json({ count });
}

export async function POST() {
    const count = await incrementVisitorCount();
    return NextResponse.json({ count });
}
