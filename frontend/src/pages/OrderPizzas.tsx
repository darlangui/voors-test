import { useOrder } from "../hook/useOrder";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.tsx";
import PizzaCard from "../components/PizzaCard";

export default function OrderPizzas() {
    const navigate = useNavigate();
    const { pizzas, removePizza, isLoading, finalizeOrder } = useOrder();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-gray-100)] text-[var(--color-gray-800)] dark:bg-[var(--color-dark-100)] dark:text-[var(--color-gray-200)] transition-colors relative p-6">

            <div className="absolute top-4 right-4 px-4 py-2">
                <ThemeToggle />
            </div>

            <h2 className="text-4xl font-extrabold mb-6 text-center text-[var(--color-tomato-300)] dark:text-[var(--color-cheese-300)]">
                Resumo do Pedido 🍕
            </h2>

            {pizzas.length === 0 ? (
                <p className="text-[var(--color-gray-600)] dark:text-[var(--color-gray-100)] text-lg">Nenhuma pizza no pedido.</p>
            ) : (
                <div className="w-full max-w-7xl flex flex-wrap justify-center gap-6">
                    {pizzas.map((pizza, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center">
                            <div className="bg-[var(--color-cheese-200)] dark:bg-[var(--color-dark-300)] p-4 rounded-lg shadow-lg w-full max-w-[280px]">
                                <PizzaCard
                                    pizza={pizza}
                                    onRemove={() => removePizza(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-lg justify-center">
                <button
                    className="w-full sm:w-auto bg-[var(--color-gray-500)] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[var(--color-gray-400)] transition cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Voltar
                </button>
                {pizzas.length > 0 && (
                    <button
                        className={`cursor-pointer bg-[var(--color-gray-500)]  w-full sm:w-auto text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[var(--color-gray-400)] transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={finalizeOrder}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processando..." : "Finalizar Pedido"}
                    </button>
                )}
            </div>
        </div>
    );
}
