import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import CustomizationCheckbox from "../components/CustomizationCheckBox";

describe("CustomizationCheckbox", () => {
    const mockOptions = [
        { label: "Extra Cheese", value: "extra_cheese" },
        { label: "Pepperoni", value: "pepperoni" },
        { label: "Mushrooms", value: "mushrooms" },
    ];

    it("renderiza corretamente as opções", () => {
        render(
            <CustomizationCheckbox
                options={mockOptions}
                selectedOptions={[]}
                onChange={() => {}}
                isDisabled={false}
            />
        );

        mockOptions.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it("desabilita os checkboxes quando `isDisabled` é `true`", () => {
        render(
            <CustomizationCheckbox
                options={mockOptions}
                selectedOptions={[]}
                onChange={() => {}}
                isDisabled={true}
            />
        );

        mockOptions.forEach((option) => {
            const label = screen.getByText(option.label).closest("label");
            expect(label).toHaveClass("opacity-50 cursor-not-allowed");
        });
    });

    it("chama `onChange` corretamente quando uma opção é clicada", () => {
        const onChangeMock = vi.fn();
        render(
            <CustomizationCheckbox
                options={mockOptions}
                selectedOptions={[]}
                onChange={onChangeMock}
                isDisabled={false}
            />
        );

        const option = screen.getByText("Extra Cheese").closest("label");
        fireEvent.click(option!);

        expect(onChangeMock).toHaveBeenCalledWith("extra_cheese");
    });

    it("exibe a opção como selecionada quando está em `selectedOptions`", () => {
        render(
            <CustomizationCheckbox
                options={mockOptions}
                selectedOptions={["pepperoni"]}
                onChange={() => {}}
                isDisabled={false}
            />
        );

        const selectedLabel = screen.getByText("Pepperoni").closest("label");
        expect(selectedLabel).toHaveClass("bg-[var(--color-gray-300)]");
    });
});
