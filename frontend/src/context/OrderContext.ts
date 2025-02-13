import { createContext } from 'react';
import { OrderContextData } from '../types/Pizza';

export const OrderContext = createContext<OrderContextData | undefined>(undefined);
