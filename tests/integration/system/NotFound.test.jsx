import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import NotFound from '@/pages/system/NotFound';

describe('NotFound Page - Integration', () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders the 404 heading', () => {
        render(<NotFound />);

        expect(screen.getByText('404')).toBeInTheDocument();
    });

    it('renders the missing track message', () => {
        render(<NotFound />);

        expect(
            screen.getByText(/Oops! This track seems to be missing/i)
        ).toBeInTheDocument();
    });

    it('renders the explanation text', () => {
        render(<NotFound />);

        expect(
            screen.getByText(/The page you are looking for might have been removed/i)
        ).toBeInTheDocument();
    });

    it('renders the Go Home link', () => {
        render(<NotFound />);

        const goHome = screen.getByRole('link', { name: /go home/i });
        expect(goHome).toBeInTheDocument();
        expect(goHome).toHaveAttribute('href', '/');
    });

    it('renders the auto-redirect notice', () => {
        render(<NotFound />);

        expect(
            screen.getByText(/Redirecting automatically in a few seconds/i)
        ).toBeInTheDocument();
    });
});