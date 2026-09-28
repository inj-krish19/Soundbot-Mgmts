import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import DeleteCharging from '@/components/charging/DeleteCharging';
import { mockFetch, resetMocks } from '../../setup/mocks';

const mockCharging = {
    _id: 'charging-456',
    note: 'Test charging',
};

describe('DeleteCharging - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders confirmation message and action buttons', () => {
        render(<DeleteCharging charging={mockCharging} panel={mockPanel} />);

        // Source currently labels as "Delete Session" (typo in DeleteCharging.jsx)
        expect(screen.getByText(/Are you sure \? Delete Session/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Tapping below will confirm and delete the charging/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls DELETE /charging/:id with credentials on Delete click', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Deleted' });

        render(<DeleteCharging charging={mockCharging} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /^delete$/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/charging/charging-456'),
            expect.objectContaining({
                method: 'DELETE',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('closes panel on Cancel click', async () => {
        const user = userEvent.setup();
        render(<DeleteCharging charging={mockCharging} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /cancel/i }));
        expect(mockPanel).toHaveBeenCalledWith(false);
    });
});