import React, { useContext } from "react";
import { Pizza } from "../types/Pizza";
import { OrderContext } from "../context/OrderContext.ts";

interface AddToOrderButtonProps {
    pizza: Pizza | null;
    onAdded?: () => void;
}

const AddToOrderButton: React.FC<AddToOrderButtonProps> = ({ pizza, onAdded }) => {
    const orderContext = useContext(OrderContext);

    if (!orderContext) {
        console.error("OrderContext não encontrado! Certifique-se de que OrderProvider está em App.tsx.");
        return null;
    }

    const { addPizza } = orderContext;

    const handleAddPizza = () => {
        if (!pizza) return;
        addPizza(pizza);

        if (onAdded) onAdded();
    };

    return (
        <button
            onClick={handleAddPizza}
            disabled={!pizza}
            className={`mt-4 px-6 py-2 rounded-lg font-bold text-[var(--color-gray-100)] 
                ${pizza ?
                "bg-[var(--color-gray-400)] cursor-pointer hover:bg-[var(--color-gray-300)] dark:bg-[var(--color-gray-600)] dark:hover:bg-[var(--color-gray-500)]" :
                "opacity-50 bg-[var(--color-gray-500)] text-[var(--color-gray-600)] cursor-not-allowed"} 
                transition-all`}
        >
            Adicionar ao Pedido
        </button>
    );
};

export default AddToOrderButton;