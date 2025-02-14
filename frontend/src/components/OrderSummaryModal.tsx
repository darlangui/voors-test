import React from "react";
import { Order } from "../types/Order";
import { Personalization, Size } from "../types/Pizza";

interface OrderSummaryModalProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

const sizePrices: Record<Size, number> = {
    pequena: 20.2,
    média: 30.3,
    grande: 40.0,
};

const personalizationPrices: Record<Personalization, number> = {
    "extra bacon": 3.0,
    "sem cebola": 0.0,
    "borda recheada": 5.0,
};

const calculatePizzaPrice = (size: string, personalizations: string[]): number => {
    let totalPrice = sizePrices[size as Size] ?? 0;

    personalizations.forEach((customization) => {
        totalPrice += personalizationPrices[customization as Personalization] ?? 0;
    });

    return totalPrice;
};

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[var(--color-gray-100)] dark:bg-[var(--color-dark-200)] p-6 rounded-lg shadow-lg w-96 text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)] max-h-[80vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4 text-[var(--color-gray-600)] dark:text-[var(--color-gray-200)]">
                    Resumo do Pedido
                </h2>

                <div className="space-y-4">
                    {order.pizzas.length > 0 ? (
                        order.pizzas.map((pizza) => {
                            const pizzaPrice = calculatePizzaPrice(pizza.size, pizza.personalizations);

                            return (
                                <div key={pizza.id} className="border-b pb-2">
                                    <p><strong>Tamanho:</strong> {pizza.size} (R$ {sizePrices[pizza.size as Size].toFixed(2)})</p>
                                    <p><strong>Sabor:</strong> {pizza.flavor}</p>
                                    {pizza.personalizations.length > 0 && (
                                        <p>
                                            <strong>Personalizações:</strong> {pizza.personalizations.join(", ")}
                                            {pizza.personalizations.map((customization) => (
                                                <span key={customization} className="block text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]">
                                                    ➕ {customization}: R$ {personalizationPrices[customization as Personalization].toFixed(2)}
                                                </span>
                                            ))}
                                        </p>
                                    )}
                                    <p className="font-semibold mt-2 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]">
                                        💰 Total desta pizza: R$ {pizzaPrice.toFixed(2)}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-[var(--color-gray-500)] dark:text-[var(--color-gray-300)]">Nenhuma pizza foi adicionada.</p>
                    )}
                </div>

                <div className="mt-4 font-bold text-[var(--color-gray-700)] dark:text-[var(--color-gray-200)]">
                    <p>🛒 <strong>Total do Pedido:</strong> R$ {order.totalPrice.toFixed(2)}</p>
                    <p>⏳ <strong>Tempo total:</strong> {order.totalTime} min</p>
                </div>

                <button
                    className="hover:cursor-pointer mt-4 w-full bg-[var(--color-gray-600)] text-white py-2 rounded hover:bg-[var(--color-gray-500)] dark:hover:bg-[var(--color-gray-400)] transition"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default OrderSummaryModal;
