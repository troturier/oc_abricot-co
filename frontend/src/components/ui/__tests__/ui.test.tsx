import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "../../../../tests/helpers/a11y";
import { alice } from "../../../../tests/helpers/fixtures";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { TextField } from "../Field";
import { Modal } from "../Modal";
import { ProgressBar } from "../ProgressBar";
import { StatusTag } from "../StatusTag";

describe("UI kit", () => {
  it("StatusTag shows the French label with the status colors", () => {
    render(<StatusTag status="IN_PROGRESS" />);
    const tag = screen.getByText("En cours");
    expect(tag).toHaveClass("bg-progress-bg", "text-progress");
  });

  it("Avatar exposes the user name to screen readers unless decorative", () => {
    const { rerender } = render(<Avatar user={alice} />);
    expect(screen.getByRole("img", { name: "Alice Martin" })).toHaveTextContent("AM");
    rerender(<Avatar user={alice} decorative />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("Button defaults to type=button and supports the disabled state", () => {
    render(<Button disabled>Ajouter</Button>);
    const button = screen.getByRole("button", { name: "Ajouter" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toBeDisabled();
  });

  it("TextField links its label, error message and invalid state", async () => {
    const { container } = render(<TextField label="Email" name="email" required error={["Adresse email invalide."]} />);
    const input = screen.getByLabelText(/Email/);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Adresse email invalide.");
    await expectNoA11yViolations(container);
  });

  it("ProgressBar exposes its value", () => {
    render(<ProgressBar value={66.6} label="Progression" />);
    expect(screen.getByRole("progressbar", { name: "Progression" })).toHaveAttribute("aria-valuenow", "67");
  });

  it("Modal is labelled by its title and closes with its close button", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Créer un projet">
        <p>Contenu</p>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog", { name: "Créer un projet" });
    expect(dialog).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "Fermer" }));
    expect(onClose).toHaveBeenCalled();
    await expectNoA11yViolations(dialog);
  });
});
