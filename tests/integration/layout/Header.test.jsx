import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import Header from '@/components/layout/Header';

vi.mock('@/components/layout/Navbar', () => ({
    default: () => <nav>Desktop Navbar</nav>,
}));

vi.mock('@/components/layout/NavbarMobile', () => ({
    default: () => <nav>Mobile Navbar</nav>,
}));

describe('Header - Integration', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/');
    });

    it('renders logo and brand name', () => {
        render(<Header />);

        expect(screen.getByRole('img', { name: /logo/i })).toHaveAttribute('src', '/icon.svg');
        expect(screen.getByRole('link', { name: /soundbot mgmts/i })).toHaveAttribute('href', '/');
    });

    it('renders desktop navigation', () => {
        render(<Header />);

        expect(screen.getByText('Desktop Navbar')).toBeInTheDocument();
    });

    it('does not render mobile navigation initially', () => {
        render(<Header />);

        expect(screen.queryByText('Mobile Navbar')).not.toBeInTheDocument();
    });

    it('opens mobile navigation when menu button is clicked', async () => {
        const user = userEvent.setup();

        render(<Header />);

        const buttons = screen.getAllByRole('button');

        await user.click(buttons[0]);

        expect(screen.getByText('Mobile Navbar')).toBeInTheDocument();
    });

    it('closes mobile navigation when menu button is clicked again', async () => {
        const user = userEvent.setup();

        render(<Header />);

        const button = screen.getAllByRole('button')[0];

        await user.click(button);
        expect(screen.getByText('Mobile Navbar')).toBeInTheDocument();

        await user.click(button);
        expect(screen.queryByText('Mobile Navbar')).not.toBeInTheDocument();
    });
});