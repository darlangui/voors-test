import ThemeToggle from "../components/ThemeToggle.tsx";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import CustomizationSelector from "../components/CustomizationSelector.tsx";
import CustomizationCheckbox from "../components/CustomizationCheckBox.tsx";
import AddToOrderButton from "../components/AddToOrderButton.tsx";
import OrderSummaryButton from "../components/OrderSummaryButton.tsx";
import { Flavor, Personalization, Pizza, Size } from "../types/Pizza.ts";
import { usePizzaPrice } from "../hook/usePizzaPrice.ts";
import { sizes, flavor, customizationOptions } from "../types/Pizza.ts";

export default function ChoosePizzas() {
    const [selectedSize, setSelectedSize] = useState<Size | "">("");
    const [selectedFlavor, setSelectedFlavor] = useState<Flavor | "">("");
    const [customizations, setCustomizations] = useState<Personalization[]>([]);

    const { totalPrice, totalTime } = usePizzaPrice(selectedSize, selectedFlavor, customizations);

    const handleCustomizationChange = (value: Personalization) => {
        setCustomizations((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const pizza: Pizza | null = selectedSize && selectedFlavor
        ? { size: selectedSize, flavor: selectedFlavor, personalizations: customizations.length > 0 ? customizations : undefined }
        : null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-gray-100)] text-[var(--color-gray-600)] dark:bg-[var(--color-dark-100)] dark:text-[var(--color-gray-200)] transition-colors p-4 sm:p-6 relative overflow-hidden">

            <div className="absolute top-4 right-4 px-4 py-2">
                <ThemeToggle />
            </div>

            <div className="flex flex-col md:flex-row w-full max-w-5xl items-center justify-between gap-6">

                <div className="w-full md:w-1/2 space-y-6">
                    <h1 className="text-4xl font-extrabold text-center md:text-left text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)]">
                        Pizza Voors 🍕
                    </h1>
                    <p className="text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-center md:text-left">
                        Melhor não tem! Escolha sua combinação perfeita.
                    </p>

                    <div className="flex items-center justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-[var(--color-gray-500)] dark:text-[var(--color-gray-200)] text-lg mr-1" />
                        ))}
                        <span className="text-[var(--color-gray-600)] text-sm dark:text-[var(--color-gray-200)]">(5.0)</span>
                    </div>

                    <div>
                        <h3 className="my-1 text-lg text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] font-semibold">Escolha o tamanho:</h3>
                        <CustomizationSelector<Size>
                            values={sizes}
                            selectedValue={selectedSize}
                            onChange={(value) => setSelectedSize(value)}
                        />
                    </div>

                    <div>
                        <h3 className="my-1 text-lg text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] font-semibold">Escolha o sabor:</h3>
                        <CustomizationSelector<Flavor>
                            values={flavor}
                            selectedValue={selectedFlavor}
                            onChange={(value) => setSelectedFlavor(value)}
                        />
                    </div>

                    <div>
                        <h3 className="my-1 text-lg text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] font-semibold">Adicionais:</h3>
                        <CustomizationCheckbox<Personalization>
                            options={customizationOptions}
                            selectedOptions={customizations}
                            onChange={handleCustomizationChange}
                            isDisabled={!selectedSize || !selectedFlavor}
                        />
                    </div>

                    {totalPrice !== null && totalTime !== null && (
                        <div className="mt-6 text-xl text-center md:text-left">
                            <p>
                                <strong>Total:</strong>
                                <span className="text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)] font-bold"> R$ {totalPrice.toFixed(2)}</span>
                            </p>
                            <p className="text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-lg">
                                Tempo de preparo: <span className="font-semibold">{totalTime} min</span>
                            </p>
                        </div>
                    )}

                    <div className="flex justify-center md:justify-start">
                        <AddToOrderButton pizza={pizza} onAdded={() => {
                            setSelectedSize("");
                            setSelectedFlavor("");
                            setCustomizations([]);
                        }} />
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <OrderSummaryButton />
                </div>
            </div>
        </div>
    );
}
