import { useDarkMode } from "../hook/useDarkMode";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ThemeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 cursor-pointer rounded-full transition duration-300 bg-[var(--color-gray-200)] dark:bg-[var(--color-gray-700)] hover:bg-[var(--color-gray-300)] dark:hover:bg-[var(--color-gray-600)]"
        >
            {isDarkMode ? (
                <SunIcon data-testid="sun-icon" className="w-6 h-6 text-[var(--color-yellow-400)]" />
            ) : (
                <MoonIcon data-testid="moon-icon" className="w-6 h-6 text-[var(--color-gray-800)]" />
            )}
        </button>
    );
};

export default ThemeToggle;
