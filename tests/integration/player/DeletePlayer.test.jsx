import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import DeletePlayer from '@/components/player/DeletePlayer';
import { mockFetch, resetMocks } from '../../setup/mocks';

const mockPlayer = {
    _id: 'player-456',
    name: 'Buds',
    nickname: 'Buds',
};

describe('DeletePlayer - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    it('renders confirmation message and action buttons', () => {
        render(<DeletePlayer player={mockPlayer} panel={mockPanel} />);

        expect(screen.getByText(/Are you sure \? Delete Player/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Tapping below will confirm and delete the player/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls DELETE /player/:id with credentials on Delete click', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Deleted' });

        render(<DeletePlayer player={mockPlayer} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /^delete$/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/player/player-456'),
            expect.objectContaining({
                method: 'DELETE',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('closes panel on Cancel click', async () => {
        const user = userEvent.setup();
        render(<DeletePlayer player={mockPlayer} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /cancel/i }));
        expect(mockPanel).toHaveBeenCalledWith(false);
    });
});