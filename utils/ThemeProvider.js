import React, { createContext, useContext, useEffect, useState } from "react";
import { lightColors, darkColors } from "./colors";

import { useColorScheme } from "react-native";

export const ThemeContext=createContext({
    dark:false,
    colors:lightColors,
    setScheme: () => {},
}); 

export const ThemeProvider = props => {
    const ColorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(ColorScheme == 'dark');

    useEffect(() => {
        setIsDark(ColorScheme == 'dark');
    }, [ColorScheme]);

    const defaultTheme={
        dark: isDark,
        colors: isDark? darkColors:lightColors,
        setScheme: (scheme) => setIsDark(scheme === 'dark'),
    };
    return(
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext);