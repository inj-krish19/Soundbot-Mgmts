import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import Setting from '@/pages/dashboard/Setting';
import { mockFetch, resetMocks } from '../../setup/mocks';

describe('Setting Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders the Settings heading', () => {
        render(<Setting />);

        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('renders Change Password action', () => {
        render(<Setting />);

        expect(screen.getByText('Change Password')).toBeInTheDocument();
    });

    it('renders Change Email action', () => {
        render(<Setting />);

        expect(screen.getByText('Change Email')).toBeInTheDocument();
    });

    it('calls change-password API with credentials on click', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Mail sent' });

        render(<Setting />);

        await user.click(screen.getByText('Change Password'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/auth/change-password'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('calls email API with credentials on Change Email click', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Mail sent' });

        render(<Setting />);

        await user.click(screen.getByText('Change Email'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/auth/email'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('handles API failure without crashing', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 500, message: 'Server error' }, 500);

        render(<Setting />);

        await user.click(screen.getByText('Change Password'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
});