import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import Profile from '@/pages/info/Profile';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockUser = {
    code: 200,
    data: {
        name: 'Krish',
        email: 'krish@example.com',
        nickname: 'inj',
        country: 'India',
        profile_picture: '/pfp/1.png',
    },
};

const mockPfps = {
    code: 200,
    data: ['/pfp/1.png', '/pfp/2.png'],
};

describe('Profile Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn().mockImplementation((url) => {
            const u = String(url);
            if (u.includes('/user/me')) {
                return Promise.resolve(createMockResponse(mockUser));
            }
            if (u.includes('/pfp')) {
                return Promise.resolve(createMockResponse(mockPfps));
            }
            return Promise.resolve(createMockResponse({ code: 200, data: {} }));
        });
    });

    it('renders Profile & Account heading and user fields', async () => {
        render(<Profile />);

        await waitFor(() => {
            expect(screen.getByText('Profile & Account')).toBeInTheDocument();
        });

        expect(
            screen.getByText(/Manage your profile, account security and account settings/i)
        ).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Krish')).toBeInTheDocument();
        });

        expect(screen.getByText('krish@example.com')).toBeInTheDocument();
        expect(screen.getByText('inj')).toBeInTheDocument();
        expect(screen.getByText('India')).toBeInTheDocument();
    });

    it('renders sidebar section labels', async () => {
        render(<Profile />);

        await waitFor(() => {
            expect(screen.getByText('Profile & Account')).toBeInTheDocument();
        });

        expect(screen.getAllByText('Profile').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Change Password').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Change Email').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Security').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Sign Out').length).toBeGreaterThanOrEqual(1);
    });

    it('calls GET /user/me with credentials', async () => {
        render(<Profile />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const meCall = global.fetch.mock.calls.find((c) => String(c[0]).includes('/user/me'));
        expect(meCall).toBeTruthy();
        expect(meCall[1]).toMatchObject({
            method: 'GET',
            credentials: 'include',
        });
    });

    it('requests password change link', async () => {
        const user = userEvent.setup();

        global.fetch = vi.fn().mockImplementation((url) => {
            const u = String(url);
            if (u.includes('/user/me')) return Promise.resolve(createMockResponse(mockUser));
            if (u.includes('/pfp')) return Promise.resolve(createMockResponse(mockPfps));
            if (u.includes('/auth/change-password')) {
                return Promise.resolve(createMockResponse({ code: 200, message: 'Sent' }));
            }
            return Promise.resolve(createMockResponse({ code: 200, data: {} }));
        });

        render(<Profile />);

        await waitFor(() => {
            expect(screen.getAllByText('Change Password').length).toBeGreaterThanOrEqual(1);
        });

        const passwordButtons = screen.getAllByText('Change Password');
        await user.click(passwordButtons[0]);

        await waitFor(() => {
            expect(
                screen.getByRole('button', { name: /send password change link/i })
            ).toBeInTheDocument();
        });

        await user.click(screen.getByRole('button', { name: /send password change link/i }));

        await waitFor(() => {
            const call = global.fetch.mock.calls.find((c) =>
                String(c[0]).includes('/auth/change-password')
            );
            expect(call).toBeTruthy();
            expect(call[1]).toMatchObject({
                method: 'POST',
                credentials: 'include',
            });
        });
    });
});