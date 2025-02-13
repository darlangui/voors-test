import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext.ts';

export const usePizzaOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('usePizzaCart must be used within a OrderContext');
    }
    return context;
};