import type { Metadata } from "next";
import { CalendarIcon, FolderSmallIcon, TaskCheckboxIcon } from "@/components/icons";
import { AssignedTaskList } from "@/components/dashboard/AssignedTaskList";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { UrgentProjectsList } from "@/components/dashboard/UrgentProjectsList";
import { ProjectModalButton } from "@/components/projects/ProjectModalButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { ViewSwitcher } from "@/components/ui/ViewSwitcher";
import { fetchAssignedTasks, fetchProjectsWithAssignedTasks } from "@/lib/api/abricot";
import { requireUser } from "@/lib/auth/dal";
import { getDisplayName } from "@/lib/format";
import { filterTasksOfMonth, parseMonthParam, sortByUrgency } from "@/lib/tasks";

export const metadata: Metadata = { title: "Tableau de bord" };

const VIEWS = ["list", "kanban", "projects"] as const;
type DashboardView = (typeof VIEWS)[number];

export default async function DashboardPage({ searchParams }: PageProps<"/dashboard">) {
  const params = await searchParams;
  const view: DashboardView = VIEWS.includes(params.view as DashboardView)
    ? (params.view as DashboardView)
    : "list";
  const month = parseMonthParam(params.month);
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-14">
      <PageHeader
        title="Tableau de bord"
        subtitle={`Bonjour ${getDisplayName(user)}, voici un aperçu de vos projets et tâches`}
        actions={<ProjectModalButton>+ Créer un projet</ProjectModalButton>}
      />
      <div className="flex flex-col gap-[30px]">
        <ViewSwitcher
          label="Vues du tableau de bord"
          current={view}
          options={[
            {
              value: "list",
              label: "Liste",
              href: "/dashboard?view=list",
              icon: <TaskCheckboxIcon />,
            },
            {
              value: "kanban",
              label: "Kanban",
              href: "/dashboard?view=kanban",
              icon: <CalendarIcon className="h-4 w-auto" />,
            },
            {
              value: "projects",
              label: "Projets",
              href: "/dashboard?view=projects",
              icon: <FolderSmallIcon />,
            },
          ]}
        />
        {view === "list" && <AssignedTaskList tasks={sortByUrgency(await fetchAssignedTasks())} />}
        {view === "kanban" && (
          <KanbanBoard
            tasks={filterTasksOfMonth(await fetchAssignedTasks(), month)}
            month={month}
          />
        )}
        {view === "projects" && (
          <UrgentProjectsList projects={await fetchProjectsWithAssignedTasks()} />
        )}
      </div>
    </div>
  );
}
