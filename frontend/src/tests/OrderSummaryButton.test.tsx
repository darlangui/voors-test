import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import OrderSummaryButton from "../components/OrderSummaryButton";
import { OrderContext } from "../context/OrderContext";
import { Pizza } from "../types/Pizza";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("OrderSummaryButton", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockPizza: Pizza = {
        size: "média",
        flavor: "calabresa",
        personalizations: ["extra bacon", "borda recheada"],
    };

    it("não renderiza o botão se não houver pizzas no pedido", () => {
        render(
            <MemoryRouter>
                <OrderContext.Provider value={{ pizzas: [], addPizza: vi.fn(), removePizza: vi.fn(), clearCart: vi.fn() }}>
                    <OrderSummaryButton />
                </OrderContext.Provider>
            </MemoryRouter>
        );

        expect(screen.queryByText(/Ver Pedido/i)).not.toBeInTheDocument();
    });

    it("renderiza corretamente quando há pizzas no pedido", () => {
        render(
            <MemoryRouter>
                <OrderContext.Provider
                    value={{
                        pizzas: [mockPizza],
                        addPizza: vi.fn(),
                        removePizza: vi.fn(),
                        clearCart: vi.fn(),
                    }}
                >
                    <OrderSummaryButton />
                </OrderContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Ver Pedido/i)).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("1"))).toBeInTheDocument();
    });

    it("navega para '/order' ao ser clicado", () => {
        render(
            <MemoryRouter>
                <OrderContext.Provider
                    value={{
                        pizzas: [mockPizza],
                        addPizza: vi.fn(),
                        removePizza: vi.fn(),
                        clearCart: vi.fn(),
                    }}
                >
                    <OrderSummaryButton />
                </OrderContext.Provider>
            </MemoryRouter>
        );

        const button = screen.getByText(/Ver Pedido/i);
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/order");
    });
});
