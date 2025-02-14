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


export const sizes: { label: string; value: Size }[] = [
    { label: "Pequena", value: "pequena" as Size },
    { label: "Média", value: "média" as Size },
    { label: "Grande", value: "grande" as Size },
];

export const flavor: { label: string; value: Flavor }[] = [
    { label: "Calabresa", value: "calabresa" as Flavor },
    { label: "Marguerita", value: "marguerita" as Flavor },
    { label: "Portuguesa", value: "portuguesa" as Flavor },
];

export const customizationOptions: { label: string; value: Personalization }[] = [
    { label: "Extra Bacon", value: "extra bacon" as Personalization },
    { label: "Sem Cebola", value: "sem cebola" as Personalization },
    { label: "Borda Recheada", value: "borda recheada" as Personalization },
];
