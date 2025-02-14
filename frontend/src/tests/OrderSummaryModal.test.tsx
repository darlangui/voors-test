import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import OrderSummaryModal from "../components/OrderSummaryModal";
import { Order } from "../types/Order";

describe("OrderSummaryModal", () => {
    const mockOrder: Order = {
        pizzas: [
            {
                id: 1,
                size: "média",
                flavor: "calabresa",
                personalizations: ["extra bacon", "borda recheada"],
            },
            {
                id: 2,
                size: "grande",
                flavor: "marguerita",
                personalizations: [],
            },
        ],
        totalPrice: 80.5,
        totalTime: 30,
        id: 0
    };

    it("não renderiza quando `isOpen` é `false`", () => {
        render(<OrderSummaryModal order={mockOrder} isOpen={false} onClose={() => {}} />);
        expect(screen.queryByText(/Resumo do Pedido/i)).not.toBeInTheDocument();
    });

    it("não renderiza quando `order` é `null`", () => {
        render(<OrderSummaryModal order={null} isOpen={true} onClose={() => {}} />);
        expect(screen.queryByText(/Resumo do Pedido/i)).not.toBeInTheDocument();
    });

    it("renderiza corretamente quando `isOpen` é `true`", () => {
        render(<OrderSummaryModal order={mockOrder} isOpen={true} onClose={() => {}} />);

        expect(screen.getByText(/Resumo do Pedido/i)).toBeInTheDocument();

        const sizeElements = screen.getAllByText(/Tamanho:/i);
        expect(sizeElements.length).toBeGreaterThanOrEqual(2);
    });

    it("exibe os valores corretos do pedido", () => {
        render(<OrderSummaryModal order={mockOrder} isOpen={true} onClose={() => {}} />);

        expect(screen.getByText((content) => content.includes("💰 Total desta pizza: R$ 38.30"))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("💰 Total desta pizza: R$ 40.00"))).toBeInTheDocument();

        expect(screen.getByText(/Total do Pedido:/i)).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("R$ 80.50"))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("30 min"))).toBeInTheDocument();
    });

    it("chama `onClose` quando o botão `Fechar` é clicado", () => {
        const onCloseMock = vi.fn();

        render(<OrderSummaryModal order={mockOrder} isOpen={true} onClose={onCloseMock} />);

        const closeButton = screen.getByText(/Fechar/i);
        fireEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
