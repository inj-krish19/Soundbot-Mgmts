import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import Verification from '@/pages/auth/Verification';
import { mockFetch, resetMocks } from '../../setup/mocks';

describe('Verification - Integration', () => {
    beforeEach(() => {
        resetMocks();
        window.history.pushState({}, '', '/verification');
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders email verification form', () => {
        render(<Verification />);

        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByText(/forget password/i)).toBeInTheDocument();
    });

    it('submits verification email to API', async () => {
        const user = userEvent.setup();

        mockFetch({ code: 200, status: 'OK', message: 'Verification email sent' });

        render(<Verification />);

        await user.type(screen.getByLabelText(/^email$/i), 'test@example.com');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/auth/verification'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email: 'test@example.com' }),
            })
        );
    });

    it('opens reset password form', async () => {
        const user = userEvent.setup();

        render(<Verification />);

        await user.click(screen.getByRole('link', { name: /forget password/i }));

        expect(screen.getByText(/^reset password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    });

    it('submits reset password request', async () => {
        const user = userEvent.setup();

        mockFetch({ code: 200, message: 'Reset link sent' });

        render(<Verification />);

        await user.click(screen.getByRole('link', { name: /forget password/i }));

        const resetPasswordTitle = screen.getByText(/^reset password$/i);
        const resetPasswordForm = resetPasswordTitle.closest('div').querySelector('form');

        await user.type(screen.getByLabelText(/^email$/i), 'test@example.com');
        await user.click(resetPasswordForm.querySelector('button[type="submit"]'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/auth/reset-password'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email: 'test@example.com' }),
            })
        );
    });
});