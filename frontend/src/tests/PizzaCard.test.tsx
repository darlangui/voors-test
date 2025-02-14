import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import PizzaCard from "../components/PizzaCard";
import { Pizza } from "../types/Pizza";
import { calculatePizzaDetails } from "../utils/calculatePizzaDetails";

vi.mock("../utils/calculatePizzaDetails", () => ({
    calculatePizzaDetails: vi.fn((size, flavor, personalizations) => ({
        totalPrice: 38.3,
        totalTime: 25,
        size,
        flavor,
        personalizations
    })),
}));

describe("PizzaCard", () => {
    const mockPizza: Pizza = {
        size: "média",
        flavor: "calabresa",
        personalizations: ["extra bacon", "borda recheada"],
    };

    it("renderiza corretamente com os detalhes da pizza", () => {
        render(<PizzaCard pizza={mockPizza} onRemove={() => {}} />);

        expect(screen.getByText(/calabresa/i)).toBeInTheDocument();
        expect(screen.getByText(/Tamanho: Média/i)).toBeInTheDocument();
        expect(screen.getByText(/Preço Base/i)).toHaveTextContent("R$ 38.30");
        expect(screen.getByText(/Total:/i)).toHaveTextContent("R$ 38.30");
        expect(screen.getByText(/Tempo de preparo:/i)).toHaveTextContent("25 min");

        expect(calculatePizzaDetails).toHaveBeenCalledWith("média", "calabresa", ["extra bacon", "borda recheada"]);
    });

    it("mostra as personalizações corretamente", () => {
        render(<PizzaCard pizza={mockPizza} onRemove={() => {}} />);

        expect(screen.getByText(/extra bacon/i)).toBeInTheDocument();
        expect(screen.getByText(/borda recheada/i)).toBeInTheDocument();
        expect(screen.getByText(/3.00/)).toBeInTheDocument();
        expect(screen.getByText(/5.00/)).toBeInTheDocument();
    });

    it("chama `onRemove` quando o botão de remover é clicado", () => {
        const onRemoveMock = vi.fn();
        render(<PizzaCard pizza={mockPizza} onRemove={onRemoveMock} />);

        const removeButton = screen.getByText(/remover/i);
        fireEvent.click(removeButton);

        expect(onRemoveMock).toHaveBeenCalledTimes(1);
    });
});
