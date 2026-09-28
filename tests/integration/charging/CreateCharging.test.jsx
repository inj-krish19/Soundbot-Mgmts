import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import CreateCharging from '@/components/charging/CreateCharging';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockPlayers = {
    code: 200,
    data: [{ _id: 'p1', nickname: 'AirPods', type: 'earbud' }],
};

describe('CreateCharging - Integration', () => {
    const mockPanel = vi.fn();

    beforeEach(() => {
        resetMocks();
        mockPanel.mockClear();
        global.fetch = vi.fn().mockResolvedValueOnce(createMockResponse(mockPlayers));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders Create Charging heading and form fields', async () => {
        render(<CreateCharging panel={mockPanel} />);

        expect(screen.getByText('Create Charging')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        expect(screen.getByLabelText(/charging start date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/charging end date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/charging start time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/charging end time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/first session date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last session date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^note$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('submits POST /charging with credentials', async () => {
        const user = userEvent.setup();

        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse({ code: 200, status: 'OK' }));

        render(<CreateCharging panel={mockPanel} />);

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        await user.type(screen.getByLabelText(/^note$/i), 'Gone for Walk');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/charging/'),
                expect.objectContaining({
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' },
                })
            );
        });

        const postCall = global.fetch.mock.calls.find(
            (c) => c[1]?.method === 'POST' && String(c[0]).includes('/charging/')
        );
        const body = JSON.parse(postCall[1].body);
        expect(body.player).toBe('p1');
        expect(body.note).toBe('Gone for Walk');
        expect(body).toHaveProperty('chargingStartDate');
        expect(body).toHaveProperty('chargingEndDate');
        expect(body).toHaveProperty('firstSessionDate');
        expect(body).toHaveProperty('lastSessionDate');
    });
});