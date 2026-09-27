import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import UpdateDevice from '@/components/device/UpdateDevice';
import { mockFetch, resetMocks } from '../../setup/mocks';

const mockDevice = {
    _id: 'device-123',
    name: 'Samsung S24',
    nickname: 'Sun S24',
    company: 'Samsung',
    type: 'phone',
};

describe('UpdateDevice - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Update Device heading and pre-filled fields', () => {
        render(<UpdateDevice device={mockDevice} panel={mockPanel} />);

        expect(screen.getByText('Update Device')).toBeInTheDocument();
        expect(screen.getByLabelText(/^name$/i)).toHaveValue('Samsung S24');
        expect(screen.getByLabelText(/^nickname$/i)).toHaveValue('Sun S24');
        expect(screen.getByLabelText(/^company$/i)).toHaveValue('Samsung');
        expect(screen.getByText('phone')).toBeInTheDocument();
    });

    it('submits PUT /device/:id with credentials and updated data', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Updated' });

        render(<UpdateDevice device={mockDevice} panel={mockPanel} />);

        await user.clear(screen.getByLabelText(/^nickname$/i));
        await user.type(screen.getByLabelText(/^nickname$/i), 'Galaxy');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/device/device-123'),
            expect.objectContaining({
                method: 'PUT',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );

        const body = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(body.nickname).toBe('Galaxy');
        expect(body.name).toBe('Samsung S24');
        expect(body.type).toBe('phone');
    });
});