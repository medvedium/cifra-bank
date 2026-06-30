import {HomePage, SiteInfo} from "@/lib/content/types";
import {readFile} from "node:fs/promises";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");

async function readJson<T>(relativePath: string): Promise<T> {
    const filePath = path.join(contentDir, relativePath);
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
}

export async function getSiteInfo(): Promise<SiteInfo> {
    return readJson<SiteInfo>('site.json');
}

export async function getHomePage(): Promise<HomePage> {
    return readJson<HomePage>('pages/home.json');
}