import ThemeToggle from "../components/ThemeToggle.tsx";
import pizzaImage from "../assets/pizza.svg";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import CustomizationSelector from "../components/CustomizationSelector.tsx";
import CustomizationCheckbox from "../components/CustomizationCheckBox.tsx";
import AddToOrderButton from "../components/AddToOrderButton.tsx";
import OrderSummaryButton from "../components/OrderSummaryButton.tsx";
import {Flavor, Personalization, Pizza, Size} from "../types/Pizza.ts";
import {usePizzaPrice} from "../hook/usePizzaPrice.ts";


export default function ChoosePizzas() {
    const [selectedSize, setSelectedSize] = useState<Size | "">("");
    const [selectedFlavor, setSelectedFlavor] = useState<Flavor | "">("");
    const [customizations, setCustomizations] = useState<Personalization[]>([]);

    const { totalPrice, totalTime } = usePizzaPrice(selectedSize, selectedFlavor, customizations);

    const sizes: { label: string; value: Size }[] = [
        { label: "Pequena", value: "pequena" as Size },
        { label: "Média", value: "média" as Size },
        { label: "Grande", value: "grande" as Size },
    ];

    const flavor: { label: string; value: Flavor }[] = [
        { label: "Calabresa", value: "calabresa" as Flavor },
        { label: "Marguerita", value: "marguerita" as Flavor },
        { label: "Portuguesa", value: "portuguesa" as Flavor },
    ];

    const customizationOptions: { label: string; value: Personalization }[] = [
        { label: "Extra Bacon", value: "extra bacon" as Personalization },
        { label: "Sem Cebola", value: "sem cebola" as Personalization },
        { label: "Borda Recheada", value: "borda recheada" as Personalization },
    ];

    const handleCustomizationChange = (value: Personalization) => {
        setCustomizations((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const pizza: Pizza | null = selectedSize && selectedFlavor
        ? { size: selectedSize, flavor: selectedFlavor, personalizations: customizations.length > 0 ? customizations : undefined }
        : null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors relative overflow-hidden">
            <div className="absolute top-4 right-4 px-4 py-2">
                <ThemeToggle />
            </div>

            <div className="flex flex-wrap md:flex-nowrap w-full max-w-5xl items-center justify-between p-6 relative">

                <div className="w-full md:w-1/2 space-y-4 z-10">
                    <h1 className="text-4xl font-bold">Pizza Voors</h1>
                    <p className="text-gray-500 dark:text-gray-100">melhor não tem!</p>

                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 dark:text-gray-100 text-lg mr-1" />
                        ))}
                        <span className="text-gray-600 text-sm dark:text-gray-200">(5)</span>
                    </div>

                    <div>
                        <h3 className="my-1 text-lg text-gray-500 dark:text-gray-100">Escolha o tamanho:</h3>
                        <CustomizationSelector<Size>
                            values={sizes}
                            selectedValue={selectedSize}
                            onChange={(value) => setSelectedSize(value)}
                        />
                    </div>

                    <div>
                        <h3 className="my-1 text-lg text-gray-500 dark:text-gray-100">Escolha o sabor:</h3>
                        <CustomizationSelector<Flavor>
                            values={flavor}
                            selectedValue={selectedFlavor}
                            onChange={(value) => setSelectedFlavor(value)}
                        />
                    </div>

                    <div>
                        <h3 className="my-1 text-lg text-gray-500 dark:text-gray-100">Adicionais: </h3>
                        <CustomizationCheckbox<Personalization>
                            options={customizationOptions}
                            selectedOptions={customizations}
                            onChange={handleCustomizationChange}
                            isDisabled={!selectedSize || !selectedFlavor}
                        />
                    </div>

                    {totalPrice !== null && totalTime !== null && (
                        <div className="mt-6 text-xl">
                            <p>
                                Total: <span className="text-black dark:text-white font-semibold">R$ {totalPrice.toFixed(2)}</span>
                            </p>
                            <p  className="text-gray-300 dark:text-gray-700 text-lg">
                                Tempo de preparo: <span className="text-gray-300 dark:text-gray-700">{totalTime} min</span>
                            </p>
                        </div>
                    )}

                    <AddToOrderButton pizza={pizza} />
                </div>

                <div className="absolute top-0 right-0 h-full overflow-hidden hidden sm:block sm:w-1/3 sm:justify-end">
                    <img
                        src={pizzaImage}
                        alt="Margherita Pizza"
                        className="h-full w-auto max-w-none"
                    />
                </div>

                <OrderSummaryButton />
            </div>
        </div>
    );
}
