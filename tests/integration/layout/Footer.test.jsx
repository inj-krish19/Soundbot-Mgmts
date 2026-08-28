import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Footer from '@/components/layout/Footer';

describe('Footer - Integration', () => {
    it('renders Soundbot Mgmts branding and description', () => {
        render(<Footer />);

        expect(screen.getByText('Soundbot Mgmts')).toBeInTheDocument();
        expect(screen.getByText(/helps users track and analyze/i)).toBeInTheDocument();
    });

    it('renders primary navigation links', () => {
        render(<Footer />);

        expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
        expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
    });

    it('renders legal navigation links', () => {
        render(<Footer />);

        expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy-policy');
        expect(screen.getByRole('link', { name: /cookie policy/i })).toHaveAttribute('href', '/cookie-policy');
        expect(screen.getByRole('link', { name: /disclaimer/i })).toHaveAttribute('href', '/disclaimer');
        expect(screen.getByRole('link', { name: /update and changes/i })).toHaveAttribute('href', '/update-and-changes');
    });

    it('renders quick start links', () => {
        render(<Footer />);

        expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/verification');
        expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
        expect(screen.getByRole('link', { name: /charging/i })).toHaveAttribute('href', '/charging');
        expect(screen.getByRole('link', { name: /sessions/i })).toHaveAttribute('href', '/sessions');
    });

    it('renders the logo', () => {
        render(<Footer />);

        expect(screen.getByRole('img')).toHaveAttribute('src', '/logo.png');
    });
});