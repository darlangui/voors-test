import { Pizza } from "../types/Pizza";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createOrder(pizzas: Pizza[]) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pizzas }),
        });

        if (!response.ok) {
            throw new Error("Erro ao criar pedido. Tente novamente.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao conectar com a API:", error);
        return null;
    }
}
