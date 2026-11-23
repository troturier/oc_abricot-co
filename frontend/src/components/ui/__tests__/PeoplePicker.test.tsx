import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../../tests/helpers/a11y";
import { alice, bob, carol } from "../../../../tests/helpers/fixtures";
import { PeoplePicker } from "../PeoplePicker";

function hiddenValues(container: HTMLElement, name: string) {
  return [...container.querySelectorAll<HTMLInputElement>(`input[type=hidden][name=${name}]`)].map((input) => input.value);
}

describe("PeoplePicker", () => {
  it("filters static options and selects with the keyboard", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PeoplePicker label="Assigné à :" name="assigneeIds" valueKey="id" options={[alice, bob, carol]} />,
    );
    const combobox = screen.getByRole("combobox", { name: "Assigné à :" });
    await user.type(combobox, "bo");
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(hiddenValues(container, "assigneeIds")).toEqual([bob.id]);
    expect(screen.getByRole("button", { name: "Retirer Bob Dupont" })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it("removes a selected person", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PeoplePicker label="Assigné à :" name="assigneeIds" valueKey="id" options={[alice, bob]} defaultSelected={[alice]} />,
    );
    await user.click(screen.getByRole("button", { name: "Retirer Alice Martin" }));
    expect(hiddenValues(container, "assigneeIds")).toEqual([]);
  });

  it("searches remotely from 2 characters and submits emails", async () => {
    const user = userEvent.setup();
    const search = vi.fn().mockResolvedValue([carol]);
    const { container } = render(
      <PeoplePicker label="Contributeurs" name="contributorEmails" valueKey="email" search={search} />,
    );
    const combobox = screen.getByRole("combobox", { name: "Contributeurs" });
    await user.type(combobox, "c");
    expect(search).not.toHaveBeenCalled();
    await user.type(combobox, "a");
    await waitFor(() => expect(search).toHaveBeenCalledWith("ca"));
    await user.click(await screen.findByRole("option", { name: /Caroline Leroy/ }));
    expect(hiddenValues(container, "contributorEmails")).toEqual([carol.email]);
  });
});
