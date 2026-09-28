import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import UpdateCharging from '@/components/charging/UpdateCharging';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockCharging = {
    _id: 'charging-123',
    player: { _id: 'p1', nickname: 'AirPods', type: 'earbud' },
    chargingStartDate: '2026-03-01',
    chargingEndDate: '2026-03-01',
    chargingStartTime: '18:00',
    chargingEndTime: '20:00',
    firstSessionDate: '2026-03-02',
    lastSessionDate: '2026-03-05',
    note: 'Chill w Homies',
};

const mockPlayers = {
    code: 200,
    data: [{ _id: 'p1', nickname: 'AirPods', type: 'earbud' }],
};

describe('UpdateCharging - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
        global.fetch = vi.fn().mockResolvedValueOnce(createMockResponse(mockPlayers));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Update Charging heading and pre-filled fields', async () => {
        render(<UpdateCharging charging={mockCharging} panel={mockPanel} />);

        expect(screen.getByText('Update Charging')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        expect(screen.getByLabelText(/charging start date/i)).toHaveValue('2026-03-01');
        expect(screen.getByLabelText(/charging end date/i)).toHaveValue('2026-03-01');
        expect(screen.getByLabelText(/charging start time/i)).toHaveValue('18:00');
        expect(screen.getByLabelText(/charging end time/i)).toHaveValue('20:00');
        expect(screen.getByLabelText(/first session date/i)).toHaveValue('2026-03-02');
        expect(screen.getByLabelText(/last session date/i)).toHaveValue('2026-03-05');
        expect(screen.getByLabelText(/^note$/i)).toHaveValue('Chill w Homies');
    });

    it('submits PUT /charging/:id with credentials', async () => {
        const user = userEvent.setup();

        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse({ code: 200, status: 'OK' }));

        render(<UpdateCharging charging={mockCharging} panel={mockPanel} />);

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        await user.clear(screen.getByLabelText(/^note$/i));
        await user.type(screen.getByLabelText(/^note$/i), 'Updated note');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/charging/charging-123'),
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
        expect(body.player).toBe('p1');
    });
});