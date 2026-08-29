import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '@/components/layout/ThemeToggle';

describe('ThemeToggle - Integration', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('dark');

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: () => ({
                matches: false,
                media: '(prefers-color-scheme: dark)',
                onchange: null,
                addListener: () => { },
                removeListener: () => { },
                addEventListener: () => { },
                removeEventListener: () => { },
                dispatchEvent: () => false,
            }),
        });
    });

    it('renders theme toggle button', () => {
        render(<ThemeToggle />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('uses light theme by default', () => {
        render(<ThemeToggle />);

        expect(document.documentElement).not.toHaveClass('dark');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('loads dark theme from localStorage', async () => {
        localStorage.setItem('theme', 'dark');

        render(<ThemeToggle />);

        expect(document.documentElement).toHaveClass('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('loads light theme from localStorage', () => {
        localStorage.setItem('theme', 'light');

        render(<ThemeToggle />);

        expect(document.documentElement).not.toHaveClass('dark');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('switches from light to dark', async () => {
        const user = userEvent.setup();

        render(<ThemeToggle />);

        await user.click(screen.getByRole('button'));

        expect(document.documentElement).toHaveClass('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('switches from dark to light', async () => {
        const user = userEvent.setup();

        localStorage.setItem('theme', 'dark');

        render(<ThemeToggle />);

        await user.click(screen.getByRole('button'));

        expect(document.documentElement).not.toHaveClass('dark');
        expect(localStorage.getItem('theme')).toBe('light');
    });

    it('uses system preference when no stored preference exists', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: () => ({
                matches: true,
                media: '(prefers-color-scheme: dark)',
                onchange: null,
                addListener: () => { },
                removeListener: () => { },
                addEventListener: () => { },
                removeEventListener: () => { },
                dispatchEvent: () => false,
            }),
        });

        render(<ThemeToggle />);

        expect(document.documentElement).toHaveClass('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });
});