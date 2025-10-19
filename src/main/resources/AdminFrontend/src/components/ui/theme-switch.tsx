import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './button';

interface ThemeSwitchProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ 
  className = '', 
  showLabel = false 
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-foreground">
          {theme === 'light' ? 'Light' : 'Dark'} Mode
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="relative h-8 w-14 p-0 transition-all duration-200 hover:scale-105"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div className="flex h-full w-full items-center justify-between px-1">
          <Sun 
            className={`h-4 w-4 transition-all duration-200 ${
              theme === 'light' 
                ? 'text-yellow-500 scale-110' 
                : 'text-muted-foreground scale-90'
            }`} 
          />
          <Moon 
            className={`h-4 w-4 transition-all duration-200 ${
              theme === 'dark' 
                ? 'text-blue-400 scale-110' 
                : 'text-muted-foreground scale-90'
            }`} 
          />
        </div>
        {/* Animated indicator */}
        <div 
          className={`absolute top-0.5 h-7 w-7 rounded-full bg-primary transition-all duration-200 ${
            theme === 'light' ? 'left-0.5' : 'left-6'
          }`}
        />
      </Button>
    </div>
  );
};

export default ThemeSwitch;
