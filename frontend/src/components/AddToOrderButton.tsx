import React, { useContext } from "react";
import { Pizza } from "../types/Pizza";
import { OrderContext } from "../context/OrderContext.ts";

interface AddToOrderButtonProps {
    pizza: Pizza | null;
}

const AddToOrderButton: React.FC<AddToOrderButtonProps> = ({ pizza }) => {
    const orderContext = useContext(OrderContext);

    if (!orderContext) {
        console.error("OrderContext não encontrado! Certifique-se de que OrderProvider está em App.tsx.");
        return null;
    }

    const { addPizza } = orderContext;

    const handleAddPizza = () => {
        if (!pizza) return;
        addPizza(pizza);
    };

    return (
        <button
            onClick={handleAddPizza}
            disabled={!pizza}
            className={`mt-4 px-6 py-2 rounded-lg text-white font-bold ${
                pizza ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
        >
            Adicionar ao Pedido
        </button>
    );
};

export default AddToOrderButton;
