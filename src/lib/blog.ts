import fs from 'fs';
import path from 'path';
import { BlogPost } from './types';

export { type BlogPost };

const dataPath = path.join(process.cwd(), 'src', 'data', 'blog.json');

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const fileContents = await fs.promises.readFile(dataPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return [];
    }
}

export async function saveBlogPosts(posts: BlogPost[]) {
    await fs.promises.writeFile(dataPath, JSON.stringify(posts, null, 2));
}

export async function addBlogPost(post: BlogPost) {
    const posts = await getBlogPosts();
    posts.push(post);
    await saveBlogPosts(posts);
}

export async function deleteBlogPost(id: string) {
    const posts = await getBlogPosts();
    const newPosts = posts.filter(p => p.id !== id);
    await saveBlogPosts(newPosts);
}
