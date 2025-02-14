interface Option<T> {
    label: string;
    value: T;
}

interface CustomizationSelectorProps<T extends string> {
    values: Option<T>[];
    selectedValue: T | "";
    onChange: (value: T) => void;
}

const CustomizationSelector = <T extends string>({
                                                     values,
                                                     selectedValue,
                                                     onChange,
                                                 }: CustomizationSelectorProps<T>) => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-3">
                {values.map((option) => (
                    <label
                        key={option.value}
                        className={`px-4 py-2 rounded-2xl border font-medium cursor-pointer
                            ${selectedValue === option.value
                            ? "bg-yellow-200 text-black border-0"
                            : "bg-gray-100 text-gray-700 border-0"
                        }`}
                    >
                        <input
                            type="radio"
                            name="pizza-option"
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={() => onChange(option.value)} // Certificando-se de que está no formato correto
                            className="hidden"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CustomizationSelector;
