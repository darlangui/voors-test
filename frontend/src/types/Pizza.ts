export type Size = 'pequena' | 'média' | 'grande';
export type Flavor = 'calabresa' | 'marguerita' | 'portuguesa';
export type Personalization = 'extra bacon' | 'sem cebola' | 'borda recheada';

export interface Pizza {
    size: Size;
    flavor: Flavor;
    personalizations?: Personalization[];
}

export interface OrderContextData {
    pizzas: Pizza[];
    addPizza: (pizza: Pizza) => void;
    removePizza: (index: number) => void;
    clearCart: () => void;
}