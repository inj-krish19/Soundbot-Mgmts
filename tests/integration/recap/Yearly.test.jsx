import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMockResponse, resetMocks } from '../../setup/mocks';

vi.mock('@/components/recap/shared/useRecapGuard', () => ({
    default: () => ({ allowed: true, recapYear: 2025 }),
}));

vi.mock('@/components/recap/shared/RecapAudio', () => ({
    default: () => null,
}));

import YearlyRecapPage from '@/pages/recap/Yearly';

const mockRecap = {
    code: 200,
    year: 2025,
    personality: { label: 'Night Owl' },
    recap: {
        total_categories: 1,
        categories: [
            {
                key: 'listening',
                label: 'Listening',
                cards: [
                    { id: 'c1', key: 'total_time', title: 'Hours', value: '120' },
                ],
            },
        ],
    },
};

describe('Yearly Recap Page - Integration', () => {
    beforeEach(() => {
        resetMocks();
        global.fetch = vi.fn().mockResolvedValue(createMockResponse(mockRecap));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderPage = (year = '2025') =>
        render(
            <MemoryRouter initialEntries={[`/recap/yearly/${year}`]}>
                <Routes>
                    <Route path="/recap/yearly/:year" element={<YearlyRecapPage />} />
                </Routes>
            </MemoryRouter>
        );

    it('fetches yearly recap with credentials and shows intro', async () => {
        renderPage();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/recap/2025'),
                expect.objectContaining({ credentials: 'include' })
            );
        });

        await waitFor(() => {
            expect(screen.getByText('2025')).toBeInTheDocument();
        });

        expect(screen.getByText('Year in Review')).toBeInTheDocument();
        expect(
            screen.getByText(/A full year of listening, distilled into your story/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /see your recap/i })).toBeInTheDocument();
    });

    it('starts yearly recap when CTA is clicked', async () => {
        const user = userEvent.setup();
        renderPage();

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /see your recap/i })).toBeInTheDocument();
        });

        await user.click(screen.getByRole('button', { name: /see your recap/i }));

        await waitFor(() => {
            expect(screen.getByText('Listening')).toBeInTheDocument();
        });
    });
});