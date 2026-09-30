import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import UpdateSession from '@/components/session/UpdateSession';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockSession = {
    _id: 'session-123',
    player: { _id: 'p1', nickname: 'AirPods', type: 'earbud' },
    device: { _id: 'd1', nickname: 'iPhone', type: 'phone' },
    startDate: '2026-03-01',
    endDate: '2026-03-01',
    startTime: '21:30',
    endTime: '22:45',
    volume: 70,
    note: 'Chill',
};

const mockPlayers = {
    code: 200,
    data: [{ _id: 'p1', nickname: 'AirPods', type: 'earbud' }],
};

const mockDevices = {
    code: 200,
    data: [{ _id: 'd1', nickname: 'iPhone', type: 'phone' }],
};

describe('UpdateSession - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse(mockDevices));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Update Session heading and pre-filled fields', async () => {
        render(<UpdateSession session={mockSession} panel={mockPanel} />);

        expect(screen.getByText('Update Session')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        expect(screen.getByLabelText(/start date/i)).toHaveValue('2026-03-01');
        expect(screen.getByLabelText(/end date/i)).toHaveValue('2026-03-01');
        expect(screen.getByLabelText(/start time/i)).toHaveValue('21:30');
        expect(screen.getByLabelText(/end time/i)).toHaveValue('22:45');
        expect(screen.getByLabelText(/^volume$/i)).toHaveValue(70);
        expect(screen.getByLabelText(/^note$/i)).toHaveValue('Chill');
    });

    it('submits PUT /session/:id with credentials', async () => {
        const user = userEvent.setup();

        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse(mockDevices))
            .mockResolvedValueOnce(createMockResponse({ code: 200, status: 'OK' }));

        render(<UpdateSession session={mockSession} panel={mockPanel} />);

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        await user.clear(screen.getByLabelText(/^note$/i));
        await user.type(screen.getByLabelText(/^note$/i), 'Updated note');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/session/session-123'),
                expect.objectContaining({
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' },
                })
            );
        });

        const putCall = global.fetch.mock.calls.find((c) => c[1]?.method === 'PUT');
        const body = JSON.parse(putCall[1].body);
        expect(body.note).toBe('Updated note');
        expect(body.volume).toBe(0.7);
    });
});