import fs from 'fs';
import path from 'path';
import { Project } from './types';

export { type Project };

const dataPath = path.join(process.cwd(), 'src', 'data', 'projects.json');

export async function getProjects(): Promise<Project[]> {
    try {
        const fileContents = await fs.promises.readFile(dataPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return [];
    }
}

export async function saveProjects(projects: Project[]) {
    await fs.promises.writeFile(dataPath, JSON.stringify(projects, null, 2));
}

export async function addProject(project: Project) {
    const projects = await getProjects();
    projects.push(project);
    await saveProjects(projects);
}

export async function updateProject(id: string, updatedProject: Partial<Project>) {
    const projects = await getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updatedProject };
        await saveProjects(projects);
    }
}

export async function deleteProject(id: string) {
    const projects = await getProjects();
    const newProjects = projects.filter(p => p.id !== id);
    await saveProjects(newProjects);
}
