import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('@/components/recap/shared/useRecapGuard', () => ({
    default: () => ({ allowed: false }),
}));

vi.mock('@/components/recap/shared/RecapAudio', () => ({
    default: () => null,
}));

import MonthlyRecapPage from '@/pages/recap/Monthly';

describe('Recap Not Allowed - Integration', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('shows not available message when guard blocks access', () => {
        render(
            <MemoryRouter initialEntries={['/recap/monthly/2020/1']}>
                <Routes>
                    <Route path="/recap/monthly/:year/:month" element={<MonthlyRecapPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Recap not available/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Recaps are only unlocked during the first 7 days/i)
        ).toBeInTheDocument();
    });
});