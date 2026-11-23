import { describe, expect, it } from "vitest";
import { alice, bob, makeProject, makeTask } from "../../tests/helpers/fixtures";
import {
  canEditProject,
  filterTasks,
  filterTasksOfMonth,
  getProjectPeople,
  groupTasksByDueDate,
  groupTasksByStatus,
  parseMonthParam,
  shiftMonth,
  sortByUrgency,
  sortProjectsByUrgency,
} from "./tasks";
import type { ProjectWithTasks } from "./types";

describe("sortByUrgency", () => {
  it("puts unfinished tasks first, then the nearest due date, then the priority", () => {
    const tasks = [
      makeTask({ id: "done", status: "DONE", dueDate: "2026-01-01T00:00:00.000Z" }),
      makeTask({ id: "late", dueDate: "2026-05-01T00:00:00.000Z", priority: "URGENT" }),
      makeTask({ id: "soon-low", dueDate: "2026-02-01T00:00:00.000Z", priority: "LOW" }),
      makeTask({ id: "soon-high", dueDate: "2026-02-01T00:00:00.000Z", priority: "HIGH" }),
      makeTask({ id: "no-date", dueDate: null }),
    ];
    expect(sortByUrgency(tasks).map((task) => task.id)).toEqual([
      "soon-high",
      "soon-low",
      "late",
      "no-date",
      "done",
    ]);
  });

  it("does not mutate its input", () => {
    const tasks = [makeTask({ id: "b", dueDate: null }), makeTask({ id: "a" })];
    sortByUrgency(tasks);
    expect(tasks[0].id).toBe("b");
  });
});

describe("filterTasks", () => {
  const tasks = [
    makeTask({ id: "1", title: "Créer la base", status: "TODO" }),
    makeTask({ id: "2", title: "Déployer", description: "Mise en production", status: "DONE" }),
  ];

  it("searches title and description without case nor accents", () => {
    expect(filterTasks(tasks, "creer").map((t) => t.id)).toEqual(["1"]);
    expect(filterTasks(tasks, "PRODUCTION").map((t) => t.id)).toEqual(["2"]);
  });

  it("filters by status", () => {
    expect(filterTasks(tasks, "", "DONE").map((t) => t.id)).toEqual(["2"]);
    expect(filterTasks(tasks, "  ", "ALL")).toHaveLength(2);
  });
});

describe("month helpers", () => {
  it("keeps only the tasks due in the month", () => {
    const tasks = [
      makeTask({ id: "nov", dueDate: "2026-11-30T00:00:00.000Z" }),
      makeTask({ id: "dec", dueDate: "2026-12-01T00:00:00.000Z" }),
      makeTask({ id: "none", dueDate: null }),
    ];
    expect(filterTasksOfMonth(tasks, "2026-11").map((t) => t.id)).toEqual(["nov"]);
  });

  it("shifts months across years", () => {
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2026-01", -1)).toBe("2025-12");
  });

  it("validates the month search param", () => {
    const now = new Date("2026-11-23T10:00:00Z");
    expect(parseMonthParam("2026-03", now)).toBe("2026-03");
    expect(parseMonthParam("2026-13", now)).toBe("2026-11");
    expect(parseMonthParam(undefined, now)).toBe("2026-11");
  });
});

describe("grouping", () => {
  it("groups tasks by status for the kanban", () => {
    const columns = groupTasksByStatus([
      makeTask({ id: "a", status: "TODO" }),
      makeTask({ id: "b", status: "IN_PROGRESS" }),
      makeTask({ id: "c", status: "DONE" }),
      makeTask({ id: "d", status: "CANCELLED" }),
    ]);
    expect(columns.TODO.map((t) => t.id)).toEqual(["a"]);
    expect(columns.IN_PROGRESS.map((t) => t.id)).toEqual(["b"]);
    expect(columns.DONE.map((t) => t.id)).toEqual(["c"]);
  });

  it("groups tasks by due day, chronologically, undated last", () => {
    const groups = groupTasksByDueDate([
      makeTask({ id: "none", dueDate: null }),
      makeTask({ id: "late", dueDate: "2026-03-10T00:00:00.000Z" }),
      makeTask({ id: "early", dueDate: "2026-03-09T00:00:00.000Z" }),
    ]);
    expect(groups.map((group) => group.date)).toEqual(["2026-03-09", "2026-03-10", "none"]);
  });
});

describe("projects", () => {
  it("sorts projects by their nearest unfinished deadline", () => {
    const project = (id: string, dates: (string | null)[]): ProjectWithTasks => ({
      ...makeProject({ id }),
      tasks: dates.map((dueDate, index) => makeTask({ id: `${id}-${index}`, dueDate })),
    });
    const sorted = sortProjectsByUrgency([
      project("later", ["2026-06-01T00:00:00.000Z"]),
      project("none", [null]),
      project("sooner", ["2026-08-01T00:00:00.000Z", "2026-02-01T00:00:00.000Z"]),
    ]);
    expect(sorted.map((p) => p.id)).toEqual(["sooner", "later", "none"]);
  });

  it("lists the owner first without duplicates", () => {
    const project = makeProject({
      members: [
        { id: "m0", role: "ADMIN", userId: alice.id, user: alice },
        { id: "m1", role: "CONTRIBUTOR", userId: bob.id, user: bob },
      ],
    });
    expect(getProjectPeople(project).map((u) => u.id)).toEqual([alice.id, bob.id]);
  });

  it("allows edition to administrators only", () => {
    expect(canEditProject({ userRole: "ADMIN" })).toBe(true);
    expect(canEditProject({ userRole: "CONTRIBUTOR" })).toBe(false);
  });
});
