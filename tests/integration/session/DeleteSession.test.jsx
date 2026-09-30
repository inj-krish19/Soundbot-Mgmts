import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import DeleteSession from '@/components/session/DeleteSession';
import { mockFetch, resetMocks } from '../../setup/mocks';

const mockSession = {
    _id: 'session-456',
    note: 'Test session',
};

describe('DeleteSession - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders confirmation message and action buttons', () => {
        render(<DeleteSession session={mockSession} panel={mockPanel} />);

        expect(screen.getByText(/Are you sure \? Delete Session/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Tapping below will confirm and delete the session/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls DELETE /session/:id with credentials on Delete click', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Deleted' });

        render(<DeleteSession session={mockSession} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /^delete$/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/session/session-456'),
            expect.objectContaining({
                method: 'DELETE',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('closes panel on Cancel click', async () => {
        const user = userEvent.setup();
        render(<DeleteSession session={mockSession} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /cancel/i }));
        expect(mockPanel).toHaveBeenCalledWith(false);
    });
});