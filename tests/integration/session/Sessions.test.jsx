import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import Sessions from '@/pages/dashboard/Sessions';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockSummary = {
    code: 200,
    data: {
        current_sessions: { data: 5, type: 'number', units: '' },
        average_session_time: { data: 45, type: 'number', units: ' min' },
        yearly_sessions: { data: 120, type: 'number', units: '' },
        yearly_playback: { data: 3000, type: 'number', units: ' min' },
    },
};

const mockSessionsPage = {
    code: 200,
    data: [
        {
            _id: 's1',
            startDate: '2026-03-01T00:00:00.000Z',
            endDate: '2026-03-01T00:00:00.000Z',
            startTime: '21:30',
            endTime: '22:45',
            volume: 0.7,
            note: 'Chill',
            player: { nickname: 'AirPods', type: 'earbud' },
            device: { nickname: 'iPhone', type: 'phone' },
        },
    ],
};

describe('Sessions Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn().mockImplementation((url) => {
            const u = String(url);
            if (u.includes('/dashboard/sessions')) {
                return Promise.resolve(createMockResponse(mockSummary));
            }
            if (u.includes('/session/')) {
                return Promise.resolve(createMockResponse(mockSessionsPage));
            }
            return Promise.resolve(createMockResponse({ code: 200, data: [] }));
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders summary card titles', async () => {
        render(<Sessions />);

        await waitFor(() => {
            expect(screen.getByText('Current Sessions')).toBeInTheDocument();
        });

        expect(screen.getByText('Average Session Time')).toBeInTheDocument();
        expect(screen.getByText('Yearly Sessions')).toBeInTheDocument();
        expect(screen.getByText('Yearly Playback')).toBeInTheDocument();
    });

    it('renders search form and table headers', async () => {
        render(<Sessions />);

        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Start Date')).toBeInTheDocument();
        });

        expect(screen.getByText('End Date')).toBeInTheDocument();
        expect(screen.getByText('Start Time')).toBeInTheDocument();
        expect(screen.getByText('End Time')).toBeInTheDocument();
        expect(screen.getByText('Volume')).toBeInTheDocument();
        expect(screen.getByText('Player')).toBeInTheDocument();
        expect(screen.getByText('Note')).toBeInTheDocument();
    });

    it('calls session paging and dashboard APIs with credentials', async () => {
        render(<Sessions />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const withCreds = global.fetch.mock.calls.some(
            (c) => c[1] && c[1].credentials === 'include'
        );
        expect(withCreds).toBe(true);
    });
});