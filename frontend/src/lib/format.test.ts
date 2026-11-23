import { describe, expect, it } from "vitest";
import {
  formatFullDate,
  formatShortDate,
  getDisplayName,
  getInitials,
  pluralize,
  splitName,
  toDateInputValue,
} from "./format";

describe("format", () => {
  it("formats due dates like the mockup, without timezone shift", () => {
    expect(formatShortDate("2026-03-09T00:00:00.000Z")).toBe("9 mars");
    expect(formatFullDate("2026-03-09T00:00:00.000Z")).toBe("9 mars 2026");
    expect(toDateInputValue("2026-03-09T00:00:00.000Z")).toBe("2026-03-09");
    expect(toDateInputValue(null)).toBe("");
  });

  it("builds avatar initials from the name or the email", () => {
    expect(getInitials({ name: "Alice Martin", email: "a@x.fr" })).toBe("AM");
    expect(getInitials({ name: "Jean Paul Durand", email: "a@x.fr" })).toBe("JD");
    expect(getInitials({ name: null, email: "bob.dupont@x.fr" })).toBe("BD");
    expect(getInitials({ name: "", email: "zoe@x.fr" })).toBe("ZO");
  });

  it("falls back to the email when the user has no name", () => {
    expect(getDisplayName({ name: null, email: "zoe@x.fr" })).toBe("zoe@x.fr");
    expect(getDisplayName({ name: " Zoé ", email: "zoe@x.fr" })).toBe("Zoé");
  });

  it("splits the backend name into first and last names", () => {
    expect(splitName("Alice Martin")).toEqual({ firstName: "Alice", lastName: "Martin" });
    expect(splitName("Jean de La Tour")).toEqual({ firstName: "Jean", lastName: "de La Tour" });
    expect(splitName(null)).toEqual({ firstName: "", lastName: "" });
  });

  it("pluralizes French labels", () => {
    expect(pluralize(1, "personne")).toBe("1 personne");
    expect(pluralize(3, "personne")).toBe("3 personnes");
  });
});
