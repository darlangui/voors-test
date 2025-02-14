export interface Order {
    id: number;
    totalPrice: number;
    totalTime: number;
    pizzas: {
        id: number;
        size: string;
        flavor: string;
        personalizations: string[];
    }[];
}