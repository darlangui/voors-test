import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const OrderSummaryButton = () => {
    const navigate = useNavigate();
    const orderContext = useContext(OrderContext);

    if (!orderContext) {
        console.error("OrderContext não encontrado! Certifique-se de que OrderProvider está em App.tsx.");
        return null;
    }

    const { pizzas } = orderContext;

    if (pizzas.length === 0) return null;

    return (
        <button
            onClick={() => navigate("/order")}
            className="disabled:opacity-50 fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[var(--color-gray-200)] text-[var(--color-gray-800)] dark:bg-[var(--color-dark-200)] dark:text-[var(--color-gray-100)] px-6 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-[var(--color-gray-300)] dark:hover:bg-[var(--color-dark-300)] hover:cursor-pointer transition-all flex items-center gap-2"
        >
            <span className="absolute top-0 right-0 -mt-2 -mr-2 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-600"></span>
            </span>

            🛒 Ver Pedido ({pizzas.length})
        </button>
    );
};

export default OrderSummaryButton;
