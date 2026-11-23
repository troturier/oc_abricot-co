import "server-only";
import { authedRequest } from "@/lib/auth/dal";
import type { Comment, Project, ProjectSummary, ProjectWithTasks, Task, User } from "@/lib/types";

// Typed wrappers around the backend routes (see backend/README.md and /api-docs).

export async function fetchProjects() {
  const { projects } = await authedRequest<{ projects: Project[] }>("/projects");
  return projects;
}

export async function fetchProject(projectId: string) {
  const { project } = await authedRequest<{ project: Project }>(
    `/projects/${encodeURIComponent(projectId)}`,
  );
  return project;
}

export async function fetchProjectTasks(projectId: string) {
  const { tasks } = await authedRequest<{ tasks: Task[] }>(
    `/projects/${encodeURIComponent(projectId)}/tasks`,
  );
  return tasks;
}

/**
 * Projects of the user with their task completion. The backend list only returns
 * a task count, so the tasks of each project are fetched in parallel.
 */
export async function fetchProjectSummaries(): Promise<ProjectSummary[]> {
  const projects = await fetchProjects();
  return Promise.all(
    projects.map(async (project) => {
      const tasks = await fetchProjectTasks(project.id);
      return {
        ...project,
        totalTasks: tasks.length,
        doneTasks: tasks.filter((task) => task.status === "DONE").length,
      };
    }),
  );
}

export async function fetchAssignedTasks() {
  const { tasks } = await authedRequest<{ tasks: Task[] }>("/dashboard/assigned-tasks");
  return tasks;
}

export async function fetchProjectsWithAssignedTasks() {
  const { projects } = await authedRequest<{ projects: ProjectWithTasks[] }>(
    "/dashboard/projects-with-tasks",
  );
  return projects;
}

export async function searchUsers(query: string) {
  const { users } = await authedRequest<{ users: User[] }>(
    `/users/search?query=${encodeURIComponent(query)}`,
  );
  return users;
}

export async function fetchTaskComments(projectId: string, taskId: string) {
  const { comments } = await authedRequest<{ comments: Comment[] }>(
    `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}/comments`,
  );
  return comments;
}
