import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        try {
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error('Invalid JSON in local storage:', storedValue);
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};