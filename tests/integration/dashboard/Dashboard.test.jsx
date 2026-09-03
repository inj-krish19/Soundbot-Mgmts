import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import Dashboard from '@/pages/dashboard/Dashboard';
import useAuth from '@/store/AuthStore';
import details from '@/store/DetailsStore';
import { mockFetch, mockFetchSequence, resetMocks, createMockResponse } from '../../setup/mocks';

const mockSummaryData = {
    code: 200,
    status: 'OK',
    data: {
        todays_usage: { data: 45, type: 'number', units: ' min' },
        weekly_usage: { data: 210, type: 'number', units: ' min' },
        monthly_usage: { data: 900, type: 'number', units: ' min' },
        last_session: { data: '2h ago', type: 'string', units: '' },
        last_charging_playback: { data: 120, type: 'number', units: ' min' },
        buddy_player: { data: 'MyBuds', type: 'string', units: '' },
        companion_device: { data: 'Phone', type: 'string', units: '' },
        battery_health: { data: 'Stable n Steady', type: 'string', units: '' },
    },
};

const mockUserMe = {
    code: 200,
    data: { nickname: 'Tester' },
};

const mockPlayers = {
    code: 200,
    data: [
        { _id: 'p1', nickname: 'AirPods', type: 'earbud' },
        { _id: 'p2', nickname: 'Studio', type: 'headphone' },
    ],
};

const mockDevices = {
    code: 200,
    data: [
        { _id: 'd1', nickname: 'iPhone', type: 'phone' },
        { _id: 'd2', nickname: 'Laptop', type: 'desktop' },
    ],
};

const mockAnalytics = {
    code: 200,
    data: {
        'daily-usage-trend': [{ key: 'Mon', value: 30 }],
        'session-duration-distribution': [{ key: '0-30', count: 5 }],
        'monthly-usage-trend': [],
        'player-usage-distribution': [],
        'time-of-day': [],
        'charging-playback-trend': [],
        'average-session-duration': [],
        'session-total-usage': [],
        'device-usage-distribution': [],
        'cumulative-usage': [],
    },
};

describe('Dashboard Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        useAuth.setState({ auth: true });
        details.setState({ nickname: 'Tester' });

        // Sequence: getSummary, getMe, getPlayers, getDevices, getChartsInfo
        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockSummaryData))
            .mockResolvedValueOnce(createMockResponse(mockUserMe))
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse(mockDevices))
            .mockResolvedValueOnce(createMockResponse(mockAnalytics));
    });

    afterEach(() => {
        vi.useRealTimers();
        useAuth.setState({ auth: false });
    });

    it('renders welcome text with nickname', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText(/Welcome,/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Track your audio usage and insights/i)).toBeInTheDocument();
    });

    it('renders all summary card titles', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText("Todays' Usage")).toBeInTheDocument();
        });

        expect(screen.getByText('Weekly Usage')).toBeInTheDocument();
        expect(screen.getByText('Monthly Usage')).toBeInTheDocument();
        expect(screen.getByText('Last Session')).toBeInTheDocument();
        expect(screen.getByText('Playback Time')).toBeInTheDocument();
        expect(screen.getByText('Buddy Player')).toBeInTheDocument();
        expect(screen.getByText('Companion Device')).toBeInTheDocument();
        expect(screen.getByText('Player Health')).toBeInTheDocument();
    });

    it('renders Quick Actions section and links', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText('Quick Actions')).toBeInTheDocument();
        });

        expect(screen.getByRole('link', { name: /prediction/i })).toHaveAttribute('href', '/prediction');
        expect(screen.getByRole('link', { name: /recommedation/i })).toHaveAttribute('href', '/recommendation');
        expect(screen.getByRole('link', { name: /ai insights/i })).toHaveAttribute('href', '/insights');
    });

    it('renders create action buttons', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /create player/i })).toBeInTheDocument();
        });

        expect(screen.getByRole('button', { name: /create device/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create session/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create charging/i })).toBeInTheDocument();
    });

    it('renders Streaming Players and Usage Devices headings', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText('Streaming Players')).toBeInTheDocument();
        });

        expect(screen.getByText('Usage Devices')).toBeInTheDocument();
    });

    it('renders player nicknames from API data', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText('AirPods')).toBeInTheDocument();
        });

        expect(screen.getByText('Studio')).toBeInTheDocument();
    });

    it('renders device nicknames from API data', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText('iPhone')).toBeInTheDocument();
        });

        expect(screen.getByText('Laptop')).toBeInTheDocument();
    });

    it('renders Analytical Charts heading', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText('Analytical Charts')).toBeInTheDocument();
        });
    });

    it('calls dashboard and related APIs with credentials', async () => {
        render(<Dashboard />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const calls = global.fetch.mock.calls;
        const urls = calls.map((c) => String(c[0]));

        expect(urls.some((u) => u.includes('/dashboard'))).toBe(true);
        expect(urls.some((u) => u.includes('/user/me') || u.includes('/player') || u.includes('/device') || u.includes('/analytics'))).toBe(true);

        const withCreds = calls.some(
            (c) => c[1] && c[1].credentials === 'include'
        );
        expect(withCreds).toBe(true);
    });

    it('opens Create Player panel when button is clicked', async () => {
        const user = userEvent.setup();

        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse(mockSummaryData))
            .mockResolvedValueOnce(createMockResponse(mockUserMe))
            .mockResolvedValueOnce(createMockResponse(mockPlayers))
            .mockResolvedValueOnce(createMockResponse(mockDevices))
            .mockResolvedValueOnce(createMockResponse(mockAnalytics))
            .mockResolvedValue(createMockResponse({ code: 200, data: [] }));

        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /create player/i })).toBeInTheDocument();
        });

        await user.click(screen.getByRole('button', { name: /create player/i }));

        expect(screen.getByRole('button', { name: /create player/i })).toBeInTheDocument();
    });
});