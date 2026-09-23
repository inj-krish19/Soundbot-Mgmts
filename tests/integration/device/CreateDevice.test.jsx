import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import CreateDevice from '@/components/device/CreateDevice';
import { mockFetch, resetMocks } from '../../setup/mocks';

describe('CreateDevice - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Create Device heading and form fields', () => {
        render(<CreateDevice panel={mockPanel} />);

        expect(screen.getByText('Create Device')).toBeInTheDocument();
        expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^nickname$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^company$/i)).toBeInTheDocument();
        expect(screen.getByText('phone')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('defaults type to phone', () => {
        render(<CreateDevice panel={mockPanel} />);
        expect(screen.getByText('phone')).toBeInTheDocument();
    });

    it('submits form and calls POST /device with credentials', async () => {
        const user = userEvent.setup();
        mockFetch({ code: 200, status: 'OK', message: 'Device created' });

        render(<CreateDevice panel={mockPanel} />);

        await user.type(screen.getByLabelText(/^name$/i), 'Samsung S24');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/device/'),
            expect.objectContaining({
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
            })
        );

        const body = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(body).toHaveProperty('name');
        expect(body).toHaveProperty('nickname');
        expect(body).toHaveProperty('company');
        expect(body.type).toBe('phone');
    });

    it('closes panel after successful submit', async () => {
        const user = userEvent.setup();
        vi.useFakeTimers({ shouldAdvanceTime: true });
        mockFetch({ code: 200, status: 'OK' });

        render(<CreateDevice panel={mockPanel} />);

        await user.type(screen.getByLabelText(/^name$/i), 'Test Device');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        await vi.advanceTimersByTimeAsync(1100);
        expect(mockPanel).toHaveBeenCalledWith(false);
    });
});