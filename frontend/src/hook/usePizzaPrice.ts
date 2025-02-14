import { useState, useEffect } from "react";
import { Size, Flavor, Personalization } from "../types/Pizza";

interface PriceConfig {
    sizes: Record<Size, { price: number; time: number }>;
    flavors: Record<Flavor, { time: number }>;
    customizations: Record<Personalization, { price: number; time: number }>;
}

export function usePizzaPrice(
    selectedSize: Size | "",
    selectedFlavor: Flavor | "",
    selectedCustomizations: Personalization[]
) {
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [totalTime, setTotalTime] = useState<number | null>(null);

    const priceConfig: PriceConfig = {
        sizes: {
            pequena: { price: 20.2, time: 15 },
            média: { price: 30.3, time: 20 },
            grande: { price: 40.0, time: 25 },
        },
        flavors: {
            calabresa: { time: 0 },
            marguerita: { time: 0 },
            portuguesa: { time: 5 },
        },
        customizations: {
            "extra bacon": { price: 3.0, time: 0 },
            "sem cebola": { price: 0, time: 0 },
            "borda recheada": { price: 5.0, time: 5 },
        },
    };

    useEffect(() => {
        if (!selectedSize || !selectedFlavor) {
            setTotalPrice(null);
            setTotalTime(null);
            return;
        }

        let price = priceConfig.sizes[selectedSize].price;
        let time = priceConfig.sizes[selectedSize].time;

        time += priceConfig.flavors[selectedFlavor].time;

        selectedCustomizations.forEach((customization) => {
            price += priceConfig.customizations[customization]?.price || 0;
            time += priceConfig.customizations[customization]?.time || 0;
        });

        setTotalPrice(price);
        setTotalTime(time);
    }, [selectedSize, selectedFlavor, selectedCustomizations, priceConfig.sizes, priceConfig.flavors, priceConfig.customizations]);

    return { totalPrice, totalTime };
}
