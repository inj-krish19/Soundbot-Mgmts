import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Layout from '@/Layout';

vi.mock('@/components/layout/Header', () => ({
    default: () => <header>Header</header>,
}));

vi.mock('@/components/layout/Footer', () => ({
    default: () => <footer>Footer</footer>,
}));

vi.mock('@/components/layout/BackToTop', () => ({
    default: () => <button>Back To Top</button>,
}));

vi.mock('@/components/layout/ThemeToggle', () => ({
    default: () => <button>Theme Toggle</button>,
}));

describe('Layout - Integration', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/');
        window.scrollTo = vi.fn();
    });

    it('renders header, footer and layout controls', () => {
        render(<Layout />);

        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /theme toggle/i })).toBeInTheDocument();
    });

    it('renders outlet content', () => {
        render(<Layout />);

        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('scrolls to top when layout mounts', () => {
        render(<Layout />);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
    });

    it('renders layout as a full page container', () => {
        render(<Layout />);

        const main = screen.getByRole('main');

        expect(main).toHaveClass('relative');
        expect(main).toHaveClass('flex');
        expect(main).toHaveClass('flex-col');
        expect(main).toHaveClass('min-h-screen');
        expect(main).toHaveClass('w-full');
    });
});