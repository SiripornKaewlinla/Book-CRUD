import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme ต้องใช้ภายใน ThemeProvider เท่านั้น");
    }
    return context;
};

// Provider สำหรับ Theme
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode((prev) => !prev);

    const color = {
        background: isDarkMode ? "#121212" : "#FAFAFA",        // พื้นหลัง
        surface: isDarkMode ? "#1F1F1F" : "#FFFFFF",           // card / surface
        text: isDarkMode ? "#E0E0E0" : "#1A1A1A",             // ตัวหนังสือหลัก
        textSecondary: isDarkMode ? "#B0B0B0" : "#555555",    // ตัวหนังสือรอง
        primary: isDarkMode ? "#BB86FC" : "#3B82F6",          // ปุ่มหลัก / สีเด่น
        secondary: isDarkMode ? "#03DAC6" : "#2563EB",        // ปุ่มรอง / ไฮไลต์
        error: isDarkMode ? "#CF6679" : "#DC2626",            // สีแจ้งเตือน
        buttonAbout: isDarkMode ? "#9B59B6" : "#3B82F6",      // ปุ่ม About
        buttonBooks: isDarkMode ? "#1ABC9C" : "#2563EB",      // ปุ่ม Books
        shadow: isDarkMode ? "#00000050" : "#00000020",       // เงา card/ปุ่ม
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        color,
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
