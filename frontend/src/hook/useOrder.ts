import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import { createOrder } from "../services/api";

export function useOrder() {
    const navigate = useNavigate();
    const orderContext = useContext(OrderContext);

    const { pizzas, removePizza, clearCart } = orderContext || {
        pizzas: [],
        removePizza: () => {},
        clearCart: () => {}
    };

    const [isLoading, setIsLoading] = useState(false);

    const finalizeOrder = async () => {
        if (pizzas.length === 0) return;

        setIsLoading(true);
        try {
            const orderResponse = await createOrder(pizzas);
            if (orderResponse) {
                localStorage.setItem("lastOrder", JSON.stringify(orderResponse));
                clearCart();
                navigate("/confirmation");
            } else {
                alert("Erro ao finalizar pedido. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            alert("Erro inesperado. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return { pizzas, removePizza, isLoading, finalizeOrder };
}
