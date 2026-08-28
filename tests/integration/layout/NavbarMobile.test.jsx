import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import NavbarMobile from '@/components/layout/NavbarMobile';
import useAuth from '@/store/AuthStore';

describe('NavbarMobile - Integration', () => {
    beforeEach(() => {
        useAuth.setState({ auth: false });
    });

    it('renders public navigation items when unauthenticated', () => {
        render(<NavbarMobile />);

        expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/home');
        expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
        expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
        expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/verification');
    });

    it('does not render authenticated navigation when unauthenticated', () => {
        render(<NavbarMobile />);

        expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sessions/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /charging/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /profile/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign out/i })).not.toBeInTheDocument();
    });

    it('renders authenticated navigation items when authenticated', () => {
        useAuth.setState({ auth: true });

        render(<NavbarMobile />);

        expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/home');
        expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
        expect(screen.getByRole('link', { name: /sessions/i })).toHaveAttribute('href', '/sessions');
        expect(screen.getByRole('link', { name: /charging/i })).toHaveAttribute('href', '/charging');
        expect(screen.getByRole('link', { name: /profile/i })).toHaveAttribute('href', '/profile');
        expect(screen.getByRole('link', { name: /sign out/i })).toHaveAttribute('href', '/signout');
    });

    it('does not render public auth items when authenticated', () => {
        useAuth.setState({ auth: true });

        render(<NavbarMobile />);

        expect(screen.queryByRole('link', { name: /about/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /contact/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign in/i })).not.toBeInTheDocument();
    });
});