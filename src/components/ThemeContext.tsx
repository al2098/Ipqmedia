import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'ink' | 'blueprint' | 'trace';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('ink');

  useEffect(() => {
    // Apply class to body for global styling
    const body = document.body;
    body.className = ''; // Reset
    body.classList.add(`mode-${theme}`);
    
    if (theme === 'blueprint') {
      body.style.backgroundColor = '#8B0000';
      body.style.color = '#FFFFFF';
    } else if (theme === 'ink') {
      body.style.backgroundColor = '#0A0A0A';
      body.style.color = '#E0E0E0';
    } else {
      body.style.backgroundColor = '#1A1A1A';
      body.style.color = '#F5F5F5';
    }
    
    if (theme === 'trace') {
      body.classList.add('trace-effect');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
