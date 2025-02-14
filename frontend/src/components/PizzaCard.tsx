import { Pizza } from "../types/Pizza";
import { calculatePizzaDetails } from "../utils/calculatePizzaDetails";

interface PizzaCardProps {
    pizza: Pizza;
    onRemove: () => void;
}

export default function PizzaCard({ pizza, onRemove }: PizzaCardProps) {
    const { totalPrice: calculatedPrice, totalTime: calculatedTime } = calculatePizzaDetails(
        pizza.size,
        pizza.flavor,
        pizza.personalizations || []
    );

    return (
        <div className="bg-transparent dark:bg-transparent rounded-2xl p-4 flex flex-col justify-between w-full h-full max-w-sm sm:max-w-md">
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-[var(--color-gray-600)] dark:text-[var(--color-gray-200)] capitalize">
                    {pizza.flavor}
                </h3>
                <p className="text-sm text-[var(--color-gray-400)] dark:text-[var(--color-gray-300)]">
                    Tamanho: {pizza.size.charAt(0).toUpperCase() + pizza.size.slice(1)}
                </p>

                <div className="mt-2 text-sm text-[var(--color-gray-400)] dark:text-[var(--color-gray-300)]">
                    <p>Preço Base ({pizza.size}): R$ {calculatedPrice.toFixed(2)}</p>

                    {pizza.flavor === "portuguesa" && (
                        <p>+ Sabor Portuguesa: R$ 5,00 (+5 min)</p>
                    )}

                    {pizza.personalizations?.map((customization, i) => (
                        <p key={i}>
                            + {customization}: R$ {customization === "extra bacon" ? "3.00" : customization === "borda recheada" ? "5.00" : "0.00"}
                            ({customization === "borda recheada" ? "+5 min" : "0 min"})
                        </p>
                    ))}
                </div>

                <p className="mt-2 text-sm font-semibold text-[var(--color-gray-600)] dark:text-[var(--color-gray-200)]">
                    Total: R$ {calculatedPrice.toFixed(2)}
                </p>
                <p className="text-sm font-semibold text-[var(--color-gray-600)] dark:text-[var(--color-gray-200)]">
                    Tempo de preparo: {calculatedTime} min
                </p>
            </div>

            <div className="mt-3">
                <button
                    className="w-full bg-[var(--color-gray-500)] text-white px-3 py-2 rounded-md text-sm hover:bg-[var(--color-gray-400)] dark:hover:bg-[var(--color-gray-600)] hover:cursor-pointer transition"
                    onClick={onRemove}
                >
                    Remover
                </button>
            </div>
        </div>
    );
}