import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import CookiePolicy from '@/pages/legal/CookiePolicy';

describe('CookiePolicy Page - Integration', () => {

    it('renders the main heading', () => {
        render(<CookiePolicy />);
        expect(screen.getByRole('heading', { name: /cookie policy/i })).toBeInTheDocument();
    });

    it('renders key sections', () => {
        render(<CookiePolicy />);
        expect(screen.getByText('1. What Are Cookies')).toBeInTheDocument();
        expect(screen.getByText('2. How We Use Cookies')).toBeInTheDocument();
        expect(screen.getByText('3. Types of Cookies We Use')).toBeInTheDocument();
        expect(screen.getByText('4. Managing Cookies')).toBeInTheDocument();
        expect(screen.getByText('5. Changes to This Policy')).toBeInTheDocument();
        expect(screen.getByText('6. Contact')).toBeInTheDocument();
    });

    it('renders substantial content', () => {
        render(<CookiePolicy />);
        expect(screen.getByText(/Soundbot Mgmts uses cookies/i)).toBeInTheDocument();
        expect(screen.getByText(/Essential Cookies/i)).toBeInTheDocument();
    });
});