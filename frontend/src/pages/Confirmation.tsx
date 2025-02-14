import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../types/Order";
import OrderSummaryModal from "../components/OrderSummaryModal";
import ThemeToggle from "../components/ThemeToggle.tsx";

export default function Confirmation() {
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const savedOrder = localStorage.getItem("lastOrder");

        if (savedOrder) {
            const parsedOrder: Order = JSON.parse(savedOrder);
            setOrder(parsedOrder);
        } else {
            navigate("/");
        }

        setIsLoading(false);
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-[var(--color-gray-600)] dark:text-[var(--color-gray-100)]">
                <p>Carregando pedido...</p>
            </div>
        );
    }

    if (!order) return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-gray-100)] dark:bg-[var(--color-dark-100)] text-[var(--color-gray-800)] dark:text-[var(--color-gray-200)] transition-colors relative overflow-hidden p-6">

            <div className="absolute top-4 right-4 px-4 py-2">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-lg bg-[var(--color-gray-200)] dark:bg-[var(--color-dark-200)] p-6 rounded-lg shadow-lg">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-[var(--color-gray-600)] dark:text-[var(--color-gray-200)]">
                    Pedido Confirmado! 🎉
                </h2>

                <div className="text-lg text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-center md:text-left">
                    <p><strong>Total:</strong>
                        <span className="text-[var(--color-gray-800)] dark:text-[var(--color-gray-400)] font-bold"> R$ {order.totalPrice?.toFixed(2) ?? "0.00"}</span>
                    </p>
                    <p><strong>Tempo de preparo:</strong> {order.totalTime} min</p>
                </div>

                <h3 className="text-xl font-semibold mt-6 text-center md:text-left text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]">
                    Itens do Pedido:
                </h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.pizzas.map((pizza) => (
                        <div key={pizza.id} className="p-3 bg-[var(--color-gray-200)] dark:bg-[var(--color-dark-300)] rounded-lg shadow text-[var(--color-gray-800)] dark:text-[var(--color-gray-200)]">
                            <p className="text-lg font-semibold">{pizza.size} - {pizza.flavor}</p>
                            {pizza.personalizations.length > 0 && (
                                <p className="text-sm text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)]">
                                    Adicionais: {pizza.personalizations.join(", ")}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        className="cursor-pointer w-full sm:w-auto bg-[var(--color-gray-800)] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[var(--color-gray-700)] transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Ver Resumo do Pedido
                    </button>

                    <button
                        className="cursor-pointer w-full sm:w-auto bg-[var(--color-gray-400)] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[var(--color-gray-300)] transition"
                        onClick={() => navigate("/")}
                    >
                        Fazer Novo Pedido
                    </button>
                </div>
            </div>

            {order && (
                <OrderSummaryModal
                    order={order}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
