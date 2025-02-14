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
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-amber-300 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-amber-400 transition-all"
        >
            🛒 Ver Pedido ({pizzas.length})
        </button>
    );
};

export default OrderSummaryButton;
