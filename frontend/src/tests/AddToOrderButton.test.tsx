import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import AddToOrderButton from "../components/AddToOrderButton";
import { OrderContext } from "../context/OrderContext";
import { OrderContextData } from "../types/Pizza";
import { Pizza } from "../types/Pizza";
import { Size } from "../types/Pizza";
import { Flavor } from "../types/Pizza";

const mockOrderContext: OrderContextData = {
    pizzas: [],
    addPizza: vi.fn(),
    removePizza: vi.fn(),
    clearCart: vi.fn(),
};

const mockPizza: Pizza = {
    size: "medium" as Size,
    flavor: "pepperoni" as Flavor,
    personalizations: [],
};

describe("AddToOrderButton", () => {
    it("renderiza corretamente", () => {
        render(
            <OrderContext.Provider value={mockOrderContext}>
                <AddToOrderButton pizza={mockPizza} />
            </OrderContext.Provider>
        );

        expect(screen.getByText("Adicionar ao Pedido")).toBeInTheDocument();
    });

    it("desabilita o botão quando pizza é null", () => {
        render(
            <OrderContext.Provider value={mockOrderContext}>
                <AddToOrderButton pizza={null} />
            </OrderContext.Provider>
        );

        const button = screen.getByText("Adicionar ao Pedido");
        expect(button).toBeDisabled();
    });

    it("chama addPizza quando clicado", () => {
        render(
            <OrderContext.Provider value={mockOrderContext}>
                <AddToOrderButton pizza={mockPizza} />
            </OrderContext.Provider>
        );

        fireEvent.click(screen.getByText("Adicionar ao Pedido"));

        expect(mockOrderContext.addPizza).toHaveBeenCalledWith(mockPizza);
    });

    it("chama onAdded quando a pizza é adicionada", () => {
        const onAddedMock = vi.fn();

        render(
            <OrderContext.Provider value={mockOrderContext}>
                <AddToOrderButton pizza={mockPizza} onAdded={onAddedMock} />
            </OrderContext.Provider>
        );

        fireEvent.click(screen.getByText("Adicionar ao Pedido"));

        expect(onAddedMock).toHaveBeenCalledTimes(1);
    });
});
