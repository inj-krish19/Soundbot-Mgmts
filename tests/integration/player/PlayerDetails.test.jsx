import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PlayerDetails from '@/pages/dashboard/PlayerDetails';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockPlayer = {
    _id: 'player-99',
    name: 'Galaxy Buds',
    nickname: 'Buds',
    company: 'Samsung',
    type: 'earbud',
    wireless: true,
    rgb: false,
};

const mockSummary = {
    code: 200,
    data: {
        last_session: { data: '1h ago', type: 'string', units: '' },
        current_streak: { data: 3, type: 'number', units: ' days' },
        longest_streak: { data: 12, type: 'number', units: ' days' },
        yearly_sessions: { data: 40, type: 'number', units: '' },
        total_chargings: { data: 15, type: 'number', units: '' },
        total_stream_time: { data: 1200, type: 'number', units: ' min' },
    },
};

const mockAnalytics = {
    code: 200,
    data: {
        'streaming-time-distribution': [],
        'device-usage-contribution': [],
        'session-duration-distribution': [],
        'yearly-charging-count': [],
        'yearly-session-count': [],
        'yearly-streaming-distribution': [],
    },
};

describe('PlayerDetails Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse({ code: 200, data: mockPlayer }))
            .mockResolvedValueOnce(createMockResponse(mockSummary))
            .mockResolvedValueOnce(createMockResponse(mockAnalytics));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderDetails = () => {
        return render(
            <MemoryRouter initialEntries={['/player/player-99']}>
                <Routes>
                    <Route path="/player/:id" element={<PlayerDetails />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('renders summary card titles', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Last Used Session')).toBeInTheDocument();
        });

        expect(screen.getByText('Current Streak')).toBeInTheDocument();
        expect(screen.getByText('Longest Streak')).toBeInTheDocument();
        expect(screen.getByText('Yearly Sessions')).toBeInTheDocument();
        expect(screen.getByText('Lifetime Chargings')).toBeInTheDocument();
        expect(screen.getByText('Lifetime Playback')).toBeInTheDocument();
    });

    it('renders player mini card data', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Galaxy Buds')).toBeInTheDocument();
        });

        expect(screen.getByText('Buds')).toBeInTheDocument();
        expect(screen.getByText('Samsung')).toBeInTheDocument();
        expect(screen.getByText('earbud')).toBeInTheDocument();
    });

    it('renders Player Analytical Charts heading', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Player Analytical Charts')).toBeInTheDocument();
        });
    });

    it('calls player, dashboard and analytics APIs with credentials', async () => {
        renderDetails();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const urls = global.fetch.mock.calls.map((c) => String(c[0]));
        expect(urls.some((u) => u.includes('/player/player-99'))).toBe(true);
        expect(urls.some((u) => u.includes('/dashboard/player/') || u.includes('/analytics/player/'))).toBe(true);

        const withCreds = global.fetch.mock.calls.some(
            (c) => c[1] && c[1].credentials === 'include'
        );
        expect(withCreds).toBe(true);
    });
});