import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import ThemeToggle from "../components/ThemeToggle";
import { useDarkMode } from "../hook/useDarkMode";

vi.mock("../hook/useDarkMode", () => ({
    useDarkMode: vi.fn(),
}));

describe("ThemeToggle", () => {
    it("renderiza corretamente no modo claro", () => {
        // @ts-ignore
        (useDarkMode as vi.Mock).mockReturnValue({
            isDarkMode: false,
            toggleDarkMode: vi.fn(),
        });

        render(<ThemeToggle />);

        expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    });

    it("renderiza corretamente no modo escuro", () => {
        // @ts-ignore
        (useDarkMode as vi.Mock).mockReturnValue({
            isDarkMode: true,
            toggleDarkMode: vi.fn(),
        });

        render(<ThemeToggle />);

        expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    });

    it("chama `toggleDarkMode` ao ser clicado", () => {
        const toggleDarkModeMock = vi.fn();
        // @ts-ignore
        (useDarkMode as vi.Mock).mockReturnValue({
            isDarkMode: false,
            toggleDarkMode: toggleDarkModeMock,
        });

        render(<ThemeToggle />);
        const button = screen.getByRole("button");

        fireEvent.click(button);

        expect(toggleDarkModeMock).toHaveBeenCalledTimes(1);
    });
});
