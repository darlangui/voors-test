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
            <div className="flex space-x-3 flex-wrap">
                {values.map((option) => (
                    <label
                        key={option.value}
                        className={`px-4 py-2 rounded-lg border font-medium cursor-pointer transition-all 
                            ${
                            selectedValue === option.value
                                ? "bg-[var(--color-gray-300)] text-[var(--color-gray-900)] dark:bg-[var(--color-gray-400)] dark:text-[var(--color-gray-100)] border-0"
                                : "bg-[var(--color-gray-200)] text-[var(--color-gray-700)] dark:bg-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] border-0"
                        }
                            hover:bg-[var(--color-gray-300)] dark:hover:bg-[var(--color-gray-500)]`}
                    >
                        <input
                            type="radio"
                            name="pizza-option"
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={() => onChange(option.value)}
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