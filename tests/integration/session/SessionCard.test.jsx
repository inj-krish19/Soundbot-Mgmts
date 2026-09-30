import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import SessionCard from '@/components/session/SessionCard';

const mockSession = {
    _id: 's1',
    startDate: '2026-03-01',
    endDate: '2026-03-01',
    startTime: '21:30',
    endTime: '22:45',
    volume: 70,
    duration: 75,
    note: 'Listening Eminem',
    player: { nickname: 'AirPods' },
    device: { nickname: 'iPhone' },
};

describe('SessionCard - Integration', () => {

    it('renders session details', () => {
        render(<SessionCard session={mockSession} />);

        expect(screen.getByText('Session')).toBeInTheDocument();
        expect(screen.getByText('2026-03-01')).toBeInTheDocument();
        expect(screen.getByText('21:30')).toBeInTheDocument();
        expect(screen.getByText('22:45')).toBeInTheDocument();
        expect(screen.getByText('70')).toBeInTheDocument();
        expect(screen.getByText(/75 minutes/i)).toBeInTheDocument();
        expect(screen.getByText('AirPods')).toBeInTheDocument();
        expect(screen.getByText('iPhone')).toBeInTheDocument();
        expect(screen.getByText('Listening Eminem')).toBeInTheDocument();
    });
});