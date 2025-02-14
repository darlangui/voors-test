interface CustomizationOption<T> {
    label: string;
    value: T;
}

interface CustomizationCheckboxProps<T extends string> {
    options: CustomizationOption<T>[];
    selectedOptions: T[];
    onChange: (value: T) => void;
    isDisabled: boolean;
}

const CustomizationCheckbox = <T extends string>({
                                                     options,
                                                     selectedOptions,
                                                     onChange,
                                                     isDisabled,
                                                 }: CustomizationCheckboxProps<T>) => {
    return (
        <div className="mt-4">
            <div className="flex space-x-2 mt-2">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={`px-4 py-2 rounded-lg border flex items-center space-x-2 transition-all font-medium
                            ${
                            selectedOptions.includes(option.value)
                                ? "bg-[var(--color-gray-300)] text-[var(--color-gray-900)] dark:bg-[var(--color-gray-400)] dark:text-[var(--color-gray-100)] border-0"
                                : "bg-[var(--color-gray-200)] text-[var(--color-gray-700)] dark:bg-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] border-0"
                        }
                            ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--color-gray-400)] dark:hover:bg-[var(--color-gray-500)]"}
                        `}
                    >
                        <input
                            type="checkbox"
                            value={option.value}
                            checked={selectedOptions.includes(option.value)}
                            onChange={() => onChange(option.value)}
                            disabled={isDisabled}
                            className="hidden"
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CustomizationCheckbox;