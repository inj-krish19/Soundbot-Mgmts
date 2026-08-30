import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import SignUp from '@/pages/auth/SignUp';
import { mockFetchSequence, resetMocks } from '../../setup/mocks';

describe('SignUp - Integration', () => {
    beforeEach(() => {
        resetMocks();
        window.history.pushState({}, '', '/auth/signup/test-signup-hash');
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders signup form', () => {
        mockFetchSequence([
            [{ code: 200, data: ['/pfp/one.svg', '/pfp/two.svg', '/pfp/three.svg'] }],
        ]);

        render(<SignUp />);

        expect(screen.getByText(/^sign up$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^nickname$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^country$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('loads profile pictures on mount', async () => {
        const fetchMock = mockFetchSequence([
            [{ code: 200, data: ['/pfp/one.svg', '/pfp/two.svg', '/pfp/three.svg'] }],
        ]);

        render(<SignUp />);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });

    it('submits signup data to the signup API', async () => {
        const user = userEvent.setup();

        mockFetchSequence(
            [{ code: 200, data: ['/pfp/bleep.png', '/pfp/echo.png', '/pfp/wav.png'] }],
            [{ code: 200, status: 'OK', message: 'Signup Successfully' }]
        );

        render(<SignUp />);

        await user.type(screen.getByLabelText(/^name$/i), 'Test User');
        await user.type(screen.getByLabelText(/^nickname$/i), 'Tester');
        await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!');
        await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass123!');
        await user.type(screen.getByLabelText(/^country$/i), 'India');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(2);
        });

        expect(global.fetch).toHaveBeenLastCalledWith(
            expect.stringContaining('/auth/signup/test-signup-hash'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('allows selecting a profile picture', async () => {
        const user = userEvent.setup();

        mockFetchSequence([
            [{ code: 200, data: ['/pfp/one.svg', '/pfp/two.svg', '/pfp/three.svg'] }],
        ]);

        render(<SignUp />);

        await waitFor(() => {
            expect(screen.getAllByAltText('Profile Picture').length).toBeGreaterThan(0);
        });

        const picture = screen.getByAltText('Profile Picture');
        await user.click(picture);

        expect(picture).toBeInTheDocument();
    });
});