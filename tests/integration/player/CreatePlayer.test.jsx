import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import CreatePlayer from '@/components/player/CreatePlayer';
import { mockFetch, resetMocks } from '../../setup/mocks';

describe('CreatePlayer - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Create Player heading and form fields', () => {
        render(<CreatePlayer panel={mockPanel} />);

        expect(screen.getByText('Create Player')).toBeInTheDocument();
        expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^nickname$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^company$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^type$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^wireless$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^rgb$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('defaults type to earbud and wireless checked', () => {
        render(<CreatePlayer panel={mockPanel} />);

        expect(screen.getByText('earbud')).toBeInTheDocument();
        expect(screen.getByLabelText(/^wireless$/i)).toBeChecked();
        expect(screen.getByLabelText(/^rgb$/i)).not.toBeChecked();
    });

    it('submits form and calls POST /player with credentials', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Player created' });

        render(<CreatePlayer panel={mockPanel} />);

        await user.type(screen.getByLabelText(/^name$/i), 'Alright Echo 65');
        await user.type(screen.getByLabelText(/^nickname$/i), 'Echo');
        await user.type(screen.getByLabelText(/^company$/i), 'Sony');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/player/'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );

        const body = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(body).toMatchObject({
            name: 'Alright Echo 65',
            nickname: 'Echo',
            company: 'Sony',
            type: 'earbud',
            wireless: true,
            rgb: false,
        });
    });

    it('closes panel after successful submit', async () => {
        const user = userEvent.setup();
        vi.useFakeTimers({ shouldAdvanceTime: true });
        mockFetch({ code: 200, status: 'OK' });

        render(<CreatePlayer panel={mockPanel} />);

        await user.type(screen.getByLabelText(/^name$/i), 'Test');
        await user.type(screen.getByLabelText(/^nickname$/i), 'T');
        await user.type(screen.getByLabelText(/^company$/i), 'C');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        await vi.advanceTimersByTimeAsync(1100);
        expect(mockPanel).toHaveBeenCalledWith(false);
    });
});