import { Size, Flavor, Personalization } from "../types/Pizza";

interface PizzaDetails {
    totalPrice: number;
    totalTime: number;
}

export function calculatePizzaDetails(
    size: Size,
    flavor: Flavor,
    personalizations: Personalization[] = []
): PizzaDetails {
    const SIZE_PRICES: Record<Size, { price: number; time: number }> = {
        pequena: { price: 20.2, time: 15 },
        média: { price: 30.3, time: 20 },
        grande: { price: 40.0, time: 25 },
    };

    const PERSONALIZATION_PRICES: Record<Personalization, number> = {
        "extra bacon": 3.0,
        "sem cebola": 0.0,
        "borda recheada": 5.0,
    };

    const PERSONALIZATION_TIMES: Record<Personalization, number> = {
        "extra bacon": 0,
        "sem cebola": 0,
        "borda recheada": 5,
    };

    let totalPrice = SIZE_PRICES[size].price;
    let totalTime = SIZE_PRICES[size].time;

    if (flavor === "portuguesa") {
        totalPrice += 5;
        totalTime += 5;
    }

    personalizations.forEach((customization) => {
        totalPrice += PERSONALIZATION_PRICES[customization] ?? 0;
        totalTime += PERSONALIZATION_TIMES[customization] ?? 0;
    });

    return { totalPrice, totalTime };
}
