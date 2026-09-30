import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import CreateSession from '@/components/session/CreateSession';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockPlayers = {
    code: 200,
    data: [{ _id: 'p1', nickname: 'AirPods', type: 'earbud' }],
};

const mockDevices = {
    code: 200,
    data: [{ _id: 'd1', nickname: 'iPhone', type: 'phone' }],
};

describe('CreateSession - Integration', () => {
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

    it('renders Create Session heading and form fields', async () => {
        render(<CreateSession panel={mockPanel} />);

        expect(screen.getByText('Create Session')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        expect(screen.getByText('iPhone')).toBeInTheDocument();
        expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/end time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^volume$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^note$/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('defaults volume to 70', async () => {
        render(<CreateSession panel={mockPanel} />);

        await waitFor(() => {
            expect(screen.getByLabelText(/^volume$/i)).toHaveValue(70);
        });
    });

    it('submits POST /session with credentials and volume scaled 0-1', async () => {
        const user = userEvent.setup();

        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse(mockDevices))
            .mockResolvedValueOnce(createMockResponse({ code: 200, status: 'OK' }));

        render(<CreateSession panel={mockPanel} />);

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        await user.clear(screen.getByLabelText(/^note$/i));
        await user.type(screen.getByLabelText(/^note$/i), 'Listening Eminem');
        await user.clear(screen.getByLabelText(/^volume$/i));
        await user.type(screen.getByLabelText(/^volume$/i), '80');
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/session/'),
                expect.objectContaining({
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' },
                })
            );
        });

        const postCall = global.fetch.mock.calls.find(
            (c) => c[1]?.method === 'POST' && String(c[0]).includes('/session/')
        );
        const body = JSON.parse(postCall[1].body);
        expect(body.player).toBe('p1');
        expect(body.device).toBe('d1');
        expect(body.volume).toBe(0.8);
        expect(body.note).toBe('Listening Eminem');
        expect(body).toHaveProperty('startDate');
        expect(body).toHaveProperty('endDate');
        expect(body).toHaveProperty('startTime');
        expect(body).toHaveProperty('endTime');
    });
});