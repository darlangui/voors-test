import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import CustomizationSelector from "../components/CustomizationSelector";

describe("CustomizationSelector", () => {
    const mockOptions = [
        { label: "Pequena", value: "small" },
        { label: "Média", value: "medium" },
        { label: "Grande", value: "large" },
    ];

    it("renderiza corretamente todas as opções", () => {
        render(
            <CustomizationSelector values={mockOptions} selectedValue="" onChange={() => {}} />
        );

        mockOptions.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it("exibe a opção selecionada corretamente", () => {
        render(
            <CustomizationSelector values={mockOptions} selectedValue="medium" onChange={() => {}} />
        );

        const selectedLabel = screen.getByText("Média").closest("label");
        expect(selectedLabel).toHaveClass("bg-[var(--color-gray-300)]");
    });

    it("chama `onChange` corretamente ao clicar em uma opção", () => {
        const onChangeMock = vi.fn();
        render(
            <CustomizationSelector values={mockOptions} selectedValue="" onChange={onChangeMock} />
        );

        const optionLabel = screen.getByText("Grande").closest("label");
        fireEvent.click(optionLabel!);

        expect(onChangeMock).toHaveBeenCalledWith("large");
    });
});
