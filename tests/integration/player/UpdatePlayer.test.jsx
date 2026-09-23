import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import UpdatePlayer from '@/components/player/UpdatePlayer';
import { mockFetch, resetMocks } from '../../setup/mocks';

const mockPlayer = {
    _id: 'player-123',
    name: 'Alright Echo 65',
    nickname: 'Echo',
    company: 'Sony',
    type: 'headphone',
    wireless: true,
    rgb: false,
};

describe('UpdatePlayer - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Update Player heading and pre-filled fields', () => {
        render(<UpdatePlayer player={mockPlayer} panel={mockPanel} />);

        expect(screen.getByText('Update Player')).toBeInTheDocument();
        expect(screen.getByLabelText(/^name$/i)).toHaveValue('Alright Echo 65');
        expect(screen.getByLabelText(/^nickname$/i)).toHaveValue('Echo');
        expect(screen.getByLabelText(/^company$/i)).toHaveValue('Sony');
        expect(screen.getByText('headphone')).toBeInTheDocument();
        expect(screen.getByLabelText(/^wireless$/i)).toBeChecked();
        expect(screen.getByLabelText(/^rgb$/i)).not.toBeChecked();
    });

    it('submits PUT /player/:id with credentials and updated data', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Updated' });

        render(<UpdatePlayer player={mockPlayer} panel={mockPanel} />);

        await user.clear(screen.getByLabelText(/^nickname$/i));
        await user.type(screen.getByLabelText(/^nickname$/i), 'Echo Pro');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/player/player-123'),
            expect.objectContaining({
                method: 'PUT',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );

        const body = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(body.nickname).toBe('Echo Pro');
        expect(body.name).toBe('Alright Echo 65');
        expect(body.type).toBe('headphone');
    });
});