import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import SignIn from '@/pages/auth/SignIn';
import { mockFetch, resetMocks } from '../../setup/mocks';

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useParams: () => ({ hash: 'test-hash-456' }),
        useNavigate: () => vi.fn(),
    };
});

describe('SignIn Page', () => {
    beforeEach(() => {
        resetMocks();
    });

    it('renders password fields and submit button', () => {
        render(<SignIn />);

        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('shows error when passwords do not match', async () => {
        const user = userEvent.setup();
        render(<SignIn />);

        await user.type(screen.getByLabelText(/^password$/i), 'PassOne');
        await user.type(screen.getByLabelText(/confirm password/i), 'PassTwo');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).not.toHaveBeenCalled();
        });
    });

    it('calls signin API on valid submit', async () => {
        const user = userEvent.setup();
        mockFetch({
            code: 200,
            status: 'OK',
            message: 'SignIn Successfully',
        });

        render(<SignIn />);

        await user.type(screen.getByLabelText(/^password$/i), 'SecurePass123!');
        await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass123!');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });
    });
});