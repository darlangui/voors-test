import { useState, ReactNode } from 'react';
import { OrderContext } from './OrderContext.ts';
import { Pizza, OrderContextData } from '../types/Pizza';

interface Props {
    children: ReactNode;
}

export const OrderProvider = ({ children }: Props) => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);

    const addPizza = (pizza: Pizza) => setPizzas(prev => [...prev, pizza]);
    const removePizza = (index: number) =>
        setPizzas(prev => prev.filter((_, i) => i !== index));
    const clearCart = () => setPizzas([]);

    const value: OrderContextData = {
        pizzas,
        addPizza,
        removePizza,
        clearCart,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
            </OrderContext.Provider>
    );
};
