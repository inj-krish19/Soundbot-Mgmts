import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import SignOut from '@/pages/auth/SignOut';
import { mockFetch, resetMocks } from '../../setup/mocks';

describe('SignOut - Integration', () => {
    beforeEach(() => {
        resetMocks();
        window.history.pushState({}, '', '/signout');
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders sign out confirmation', () => {
        render(<SignOut />);

        expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
    });

    it('calls signout API with credentials', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Signed out successfully' });

        render(<SignOut />);
        await user.click(screen.getByRole('button', { name: /sign out/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/auth/signout'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('redirects home after successful signout', async () => {
        const user = userEvent.setup();

        mockFetch({ code: 200, status: 'OK', message: 'Signed out successfully' });

        render(<SignOut />);
        await user.click(screen.getByRole('button', { name: /sign out/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        vi.useFakeTimers();
        vi.advanceTimersByTime(5000);

        expect(window.location.href).toContain('/');
    });
});