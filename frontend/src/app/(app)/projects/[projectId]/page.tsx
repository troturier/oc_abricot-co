import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiTaskButton } from "@/components/ai/AiTaskButton";
import { ArrowLeftIcon, CalendarIcon, TaskCheckboxIcon } from "@/components/icons";
import { ContributorsBar } from "@/components/projects/ContributorsBar";
import { ProjectModalButton } from "@/components/projects/ProjectModalButton";
import { CreateTaskButton } from "@/components/tasks/CreateTaskButton";
import { ProjectTasks } from "@/components/tasks/ProjectTasks";
import { ViewSwitcher } from "@/components/ui/ViewSwitcher";
import { ApiError } from "@/lib/api/client";
import { fetchProject, fetchProjectTasks } from "@/lib/api/abricot";
import { requireUser } from "@/lib/auth/dal";
import { canEditProject, getProjectPeople } from "@/lib/tasks";

/** Loads the project, or shows the 404 page when it does not exist or is not shared with the user. */
async function loadProject(projectId: string) {
  try {
    return await Promise.all([fetchProject(projectId), fetchProjectTasks(projectId)]);
  } catch (error) {
    if (error instanceof ApiError && [400, 403, 404].includes(error.status)) notFound();
    throw error;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[projectId]">): Promise<Metadata> {
  const { projectId } = await params;
  const [project] = await loadProject(projectId);
  return { title: project.name };
}

export default async function ProjectPage({
  params,
  searchParams,
}: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  const { view } = await searchParams;
  const [[project, tasks], user] = await Promise.all([loadProject(projectId), requireUser()]);
  const people = getProjectPeople(project);
  const currentView = view === "calendar" ? "calendar" : "list";

  return (
    <div className="flex flex-col gap-10">
      {/* Mockup: back button at x=44, the rest of the page from x=112 to x=1327. */}
      {/* The title block takes the remaining width and wraps its text, so that a long
          description never pushes the buttons to a new line (stacked on mobile only). */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between lg:-mr-[12px] lg:-ml-[56px]">
        <div className="flex min-w-0 flex-1 gap-4">
          <Link
            href="/projects"
            aria-label="Retour aux projets"
            className="flex size-[57px] shrink-0 items-center justify-center rounded-card border border-gray-200 bg-white text-black hover:border-brand hover:text-brand"
          >
            <ArrowLeftIcon />
          </Link>
          <div className="flex min-w-0 flex-col gap-[17px]">
            <div className="flex flex-wrap items-baseline gap-4">
              <h1 className="font-heading text-2xl font-semibold break-words text-ink-soft">
                {project.name}
              </h1>
              {canEditProject(project) && (
                <ProjectModalButton
                  project={project}
                  canDelete={project.ownerId === user.id}
                  appearance="link"
                >
                  Modifier<span className="sr-only"> le projet</span>
                </ProjectModalButton>
              )}
            </div>
            {project.description && (
              <p className="text-lg break-words text-gray-600">{project.description}</p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2.5 sm:flex-nowrap">
          <CreateTaskButton projectId={project.id} people={people} />
          <AiTaskButton projectId={project.id} />
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:-mr-[12px] lg:ml-[12px]">
        <ContributorsBar owner={project.owner} people={people} />

        <ProjectTasks
          projectId={project.id}
          tasks={tasks}
          people={people}
          currentUser={user}
          view={currentView}
          viewSwitcher={
            <ViewSwitcher
              label="Vues des tâches"
              current={currentView}
              options={[
                {
                  value: "list",
                  label: "Liste",
                  href: `/projects/${project.id}`,
                  icon: <TaskCheckboxIcon />,
                },
                {
                  value: "calendar",
                  label: "Calendrier",
                  href: `/projects/${project.id}?view=calendar`,
                  icon: <CalendarIcon className="h-4 w-auto" />,
                },
              ]}
            />
          }
        />
      </div>
    </div>
  );
}
