import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import ChargingCard from '@/components/charging/ChargingCard';

const mockCharging = {
    _id: 'c1',
    chargingStartDate: '2026-03-01',
    chargingEndDate: '2026-03-01',
    chargingStartTime: '18:00',
    chargingEndTime: '20:00',
    firstSessionDate: '2026-03-02',
    lastSessionDate: '2026-03-05',
    chargingDuration: 120,
    note: 'Gone for Walk',
    player: { nickname: 'AirPods' },
};

describe('ChargingCard - Integration', () => {

    it('renders charging details', () => {
        render(<ChargingCard charging={mockCharging} />);

        expect(screen.getByText('Charging')).toBeInTheDocument();
        expect(screen.getByText('2026-03-01')).toBeInTheDocument();
        expect(screen.getByText('18:00')).toBeInTheDocument();
        expect(screen.getByText('20:00')).toBeInTheDocument();
        expect(screen.getByText('2026-03-02')).toBeInTheDocument();
        expect(screen.getByText('2026-03-05')).toBeInTheDocument();
        expect(screen.getByText(/120 minutes/i)).toBeInTheDocument();
        expect(screen.getByText('AirPods')).toBeInTheDocument();
        expect(screen.getByText('Gone for Walk')).toBeInTheDocument();
    });
});