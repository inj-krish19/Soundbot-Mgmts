import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import ChargingDetails from '@/pages/dashboard/ChargingDetails';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockCharging = {
    _id: 'charging-99',
    chargingStartDate: '2026-03-01T00:00:00.000Z',
    chargingEndDate: '2026-03-01T00:00:00.000Z',
    chargingStartTime: '18:00',
    chargingEndTime: '20:00',
    firstSessionDate: '2026-03-02T00:00:00.000Z',
    lastSessionDate: '2026-03-05T00:00:00.000Z',
    chargingDuration: 120,
    note: 'Gone for Walk',
    player: { _id: 'p1', nickname: 'AirPods', type: 'earbud' },
};

const mockSummary = {
    code: 200,
    data: {
        total_days: { data: 4, type: 'number', units: ' days' },
        playback_time: { data: 300, type: 'number', units: ' min' },
        total_sessions: { data: 8, type: 'number', units: '' },
        biggest_session: { data: 90, type: 'number', units: ' min' },
        longest_charging_streak: { data: 3, type: 'number', units: ' days' },
        average_session_degrade_rate: { data: 5, type: 'number', units: '%' },
    },
};

const mockSessions = { code: 200, data: [] };

const mockAnalytics = {
    code: 200,
    data: {
        'cumulative-trend': [],
        'session-duration-share': [],
        'time-usage-distribution': [],
        'weekday-vs-weekend-distribution': [],
        'volume-distribution': [],
        'divison-usage-distribution': [],
        'device-distribution': [],
        'weekly-usage-distribution': [],
    },
};

describe('ChargingDetails Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse({ code: 200, data: mockCharging }))
            .mockResolvedValueOnce(createMockResponse(mockSummary))
            .mockResolvedValueOnce(createMockResponse(mockSessions))
            .mockResolvedValueOnce(createMockResponse(mockAnalytics));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderDetails = () => {
        return render(
            <MemoryRouter initialEntries={['/charging/charging-99']}>
                <Routes>
                    <Route path="/charging/:id" element={<ChargingDetails />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('renders summary card titles', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Playback Interval')).toBeInTheDocument();
        });

        expect(screen.getByText('Playback Time')).toBeInTheDocument();
        expect(screen.getByText('Total Sessions')).toBeInTheDocument();
        expect(screen.getByText('Biggest Session')).toBeInTheDocument();
        expect(screen.getByText('Longest Streak')).toBeInTheDocument();
        expect(screen.getByText('Degrade Rate')).toBeInTheDocument();
    });

    it('renders Sessions and Analytic Charts tabs', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Sessions')).toBeInTheDocument();
        });

        expect(screen.getByText('Analytic Charts')).toBeInTheDocument();
    });

    it('shows Charging Analytical Charts when chart tab is clicked', async () => {
        const user = userEvent.setup();
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Analytic Charts')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Analytic Charts'));

        await waitFor(() => {
            expect(screen.getByText('Charging Analytical Charts')).toBeInTheDocument();
        });
    });

    it('calls charging, dashboard, sessions and analytics APIs with credentials', async () => {
        renderDetails();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const urls = global.fetch.mock.calls.map((c) => String(c[0]));
        expect(urls.some((u) => u.includes('/charging/charging-99'))).toBe(true);

        const withCreds = global.fetch.mock.calls.some(
            (c) => c[1] && c[1].credentials === 'include'
        );
        expect(withCreds).toBe(true);
    });
});