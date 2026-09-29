import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../setup/test-utils';
import Charging from '@/pages/dashboard/Charging';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockSummary = {
    code: 200,
    data: {
        yearly_charging: { data: 12, type: 'number', units: '' },
        average_charging_days: { data: 4, type: 'number', units: ' days' },
        total_chargings: { data: 40, type: 'number', units: '' },
        most_charged_player: { data: 'AirPods', type: 'string', units: '' },
    },
};

const mockChargingsPage = {
    code: 200,
    data: [
        {
            _id: 'c1',
            firstSessionDate: '2026-03-02T00:00:00.000Z',
            lastSessionDate: '2026-03-05T00:00:00.000Z',
            chargingStartDate: '2026-03-01T00:00:00.000Z',
            chargingEndDate: '2026-03-01T00:00:00.000Z',
            chargingStartTime: '18:00',
            chargingEndTime: '20:00',
            note: 'Chill',
            player: { nickname: 'AirPods', type: 'earbud' },
        },
    ],
};

describe('Charging Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn().mockImplementation((url) => {
            const u = String(url);
            if (u.includes('/dashboard/charging')) {
                return Promise.resolve(createMockResponse(mockSummary));
            }
            if (u.includes('/charging/')) {
                return Promise.resolve(createMockResponse(mockChargingsPage));
            }
            return Promise.resolve(createMockResponse({ code: 200, data: [] }));
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders summary card titles', async () => {
        render(<Charging />);

        await waitFor(() => {
            expect(screen.getByText("Years' Chargings")).toBeInTheDocument();
        });

        expect(screen.getByText('Average Charging Days')).toBeInTheDocument();
        expect(screen.getByText('Total Chargings')).toBeInTheDocument();
        expect(screen.getByText('Most Charged Player')).toBeInTheDocument();
    });

    it('renders search form and table headers', async () => {
        render(<Charging />);

        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('First Session Date')).toBeInTheDocument();
        });

        expect(screen.getByText('Last Session Date')).toBeInTheDocument();
        expect(screen.getByText('Start Date')).toBeInTheDocument();
        expect(screen.getByText('End Date')).toBeInTheDocument();
        expect(screen.getByText('Start Time')).toBeInTheDocument();
        expect(screen.getByText('End Time')).toBeInTheDocument();
        expect(screen.getByText('Player')).toBeInTheDocument();
        expect(screen.getByText('Note')).toBeInTheDocument();
    });

    it('calls charging paging and dashboard APIs with credentials', async () => {
        render(<Charging />);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const withCreds = global.fetch.mock.calls.some(
            (c) => c[1] && c[1].credentials === 'include'
        );
        expect(withCreds).toBe(true);
    });
});