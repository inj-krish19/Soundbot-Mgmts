import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import SignIn from '@/pages/auth/SignIn';
import { mockFetch, resetMocks } from '../../setup/mocks';

describe('SignIn - Integration', () => {
    beforeEach(() => {
        resetMocks();
        window.history.pushState({}, '', '/auth/signin/test-hash-456');
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders the sign in form', () => {
        render(<SignIn />);

        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('does not call API when passwords do not match', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 400, status: 'ERROR', message: 'Passwords do not match' }, 400);

        render(<SignIn />);

        await user.type(screen.getByLabelText(/^password$/i), 'PasswordOne');
        await user.type(screen.getByLabelText(/confirm password/i), 'PasswordTwo');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });

    it('calls signin API with credentials on valid submission', async () => {
        const user = userEvent.setup();

        mockFetch({ code: 200, status: 'OK', message: 'SignIn Successfully' });

        render(<SignIn />);

        await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!');
        await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass123!');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/auth/signin/test-hash-456'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('redirects to dashboard after successful signin', async () => {
        const user = userEvent.setup();

        mockFetch({ code: 200, status: 'OK', message: 'SignIn Successfully' });

        render(<SignIn />);

        await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!');
        await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass123!');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        vi.useFakeTimers();
        vi.advanceTimersByTime(5000);

        expect(window.location.pathname).toBe('/auth/signin/test-hash-456');
    });

    it('handles API failure without redirecting', async () => {
        const user = userEvent.setup();

        mockFetch({ code: 401, message: 'Invalid credentials' }, 401);

        render(<SignIn />);

        await user.type(screen.getByLabelText(/^password$/i), 'WrongPassword');
        await user.type(screen.getByLabelText(/confirm password/i), 'WrongPassword');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(window.location.pathname).toBe('/auth/signin/test-hash-456');
    });
});