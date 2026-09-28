import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import DeviceDetails from '@/pages/dashboard/DeviceDetails';
import { createMockResponse, resetMocks } from '../../setup/mocks';

const mockDevice = {
    _id: 'device-99',
    name: 'iPhone 15',
    nickname: 'Phone',
    company: 'Apple',
    type: 'phone',
};

const mockSummary = {
    code: 200,
    data: {
        yearly_device_sessions: { data: 50, type: 'number', units: '' },
        longest_yearly_session: { data: 120, type: 'number', units: ' min' },
        average_listen_time: { data: 35, type: 'number', units: ' min' },
        yearly_listening_time: { data: 800, type: 'number', units: ' min' },
    },
};

const mockAnalytics = {
    code: 200,
    data: {
        'listening-time': [],
        'player-usage-contribution': [],
        'yearly-count-trend': [],
        'session-duration-distribution': [],
    },
};

describe('DeviceDetails Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn()
            .mockResolvedValueOnce(createMockResponse({ code: 200, data: mockDevice }))
            .mockResolvedValueOnce(createMockResponse(mockSummary))
            .mockResolvedValueOnce(createMockResponse(mockAnalytics));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderDetails = () => {
        return render(
            <MemoryRouter initialEntries={['/device/device-99']}>
                <Routes>
                    <Route path="/device/:id" element={<DeviceDetails />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('renders summary card titles', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Yearly Sessions')).toBeInTheDocument();
        });

        expect(screen.getByText('Longest Session')).toBeInTheDocument();
        expect(screen.getByText('Average Listen Time')).toBeInTheDocument();
        expect(screen.getByText('Yearly Listening Time')).toBeInTheDocument();
    });

    it('renders device mini card data', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('iPhone 15')).toBeInTheDocument();
        });

        expect(screen.getByText('Phone')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getAllByText('phone').length).toBeGreaterThanOrEqual(1);
    });

    it('renders Device Analytical Charts heading', async () => {
        renderDetails();

        await waitFor(() => {
            expect(screen.getByText('Device Analytical Charts')).toBeInTheDocument();
        });
    });

    it('calls device, dashboard and analytics APIs with credentials', async () => {
        renderDetails();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

        const urls = global.fetch.mock.calls.map((c) => String(c[0]));
        expect(urls.some((u) => u.includes('/device/device-99'))).toBe(true);
        expect(urls.some((u) => u.includes('/dashboard/device/') || u.includes('/analytics/device/'))).toBe(true);

        const withCreds = global.fetch.mock.calls.some(
            (c) => c[1] && c[1].credentials === 'include'
        );
        expect(withCreds).toBe(true);
    });
});