import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import DeleteDevice from '@/components/device/DeleteDevice';
import { mockFetch, resetMocks } from '../../setup/mocks';

const mockDevice = {
    _id: 'device-456',
    name: 'iPhone',
    nickname: 'Phone',
};

describe('DeleteDevice - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    it('renders confirmation message and action buttons', () => {
        render(<DeleteDevice device={mockDevice} panel={mockPanel} />);

        expect(screen.getByText(/Are you sure \? Delete Device/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Tapping below will confirm and delete the device/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^delete$/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls DELETE /device/:id with credentials on Delete click', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Deleted' });

        render(<DeleteDevice device={mockDevice} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /^delete$/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/device/device-456'),
            expect.objectContaining({
                method: 'DELETE',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );
    });

    it('closes panel on Cancel click', async () => {
        const user = userEvent.setup();
        render(<DeleteDevice device={mockDevice} panel={mockPanel} />);

        await user.click(screen.getByRole('button', { name: /cancel/i }));
        expect(mockPanel).toHaveBeenCalledWith(false);
    });
});