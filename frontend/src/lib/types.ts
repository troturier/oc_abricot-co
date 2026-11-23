// Domain types mirroring the JSON returned by the Abricot backend (backend/src/types).

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ProjectRole = "ADMIN" | "CONTRIBUTOR";

export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface ProjectMember {
  id: string;
  role: ProjectRole;
  userId: string;
  user: User;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
}

export interface TaskAssignee {
  id: string;
  user: User;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  projectId: string;
  project?: { id: string; name: string };
  assignees: TaskAssignee[];
  comments: Comment[];
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  owner: User;
  members: ProjectMember[];
  /** Role of the current user, computed by the backend (the owner is ADMIN). */
  userRole?: ProjectRole;
  _count?: { tasks: number };
}

export interface ProjectWithTasks extends Project {
  tasks: Task[];
}

/** Project card data: the project plus its task completion figures. */
export interface ProjectSummary extends Project {
  totalTasks: number;
  doneTasks: number;
}
