import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMockResponse, resetMocks } from '../../setup/mocks';

vi.mock('@/components/recap/shared/useRecapGuard', () => ({
    default: () => ({ allowed: true, recapMonth: 9, recapYear: 2026 }),
}));

vi.mock('@/components/recap/shared/RecapAudio', () => ({
    default: () => null,
}));

import MonthlyRecapPage from '@/pages/recap/Monthly';

const mockRecap = {
    code: 200,
    year: 2026,
    monthName: 'September',
    recap: {
        cards: [
            { id: 'c1', key: 'total_sessions', title: 'Sessions', value: '42' },
            { id: 'c2', key: 'closing_remarks', title: 'Closing', value: 'Nice month' },
        ],
    },
};

describe('Monthly Recap Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn().mockResolvedValue(createMockResponse(mockRecap));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderPage = (year = '2026', month = '9') =>
        render(
            <MemoryRouter initialEntries={[`/recap/monthly/${year}/${month}`]}>
                <Routes>
                    <Route path="/recap/monthly/:year/:month" element={<MonthlyRecapPage />} />
                </Routes>
            </MemoryRouter>
        );

    it('fetches monthly recap with credentials and shows intro', async () => {
        renderPage();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/recap/2026/9'),
                expect.objectContaining({ credentials: 'include' })
            );
        });

        await waitFor(() => {
            expect(screen.getByText('September')).toBeInTheDocument();
        });

        expect(screen.getByText('2026')).toBeInTheDocument();
        expect(
            screen.getByText(/A month's worth of listening, distilled into your story/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /see your recap/i })).toBeInTheDocument();
    });

    it('starts recap when CTA is clicked', async () => {
        const user = userEvent.setup();
        renderPage();

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /see your recap/i })).toBeInTheDocument();
        });

        await user.click(screen.getByRole('button', { name: /see your recap/i }));

        await waitFor(() => {
            expect(screen.getByText(/September 2026 · Recap/i)).toBeInTheDocument();
        });
    });
});