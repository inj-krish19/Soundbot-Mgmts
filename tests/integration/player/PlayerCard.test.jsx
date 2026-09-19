import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import PlayerCard from '@/components/player/PlayerCard';

const mockPlayer = {
    _id: 'p1',
    name: 'WH-1000XM5',
    nickname: 'Sony XM5',
    company: 'Sony',
    type: 'headphone',
    wireless: true,
    rgb: false,
};

describe('PlayerCard - Integration', () => {

    it('renders player details', () => {
        render(<PlayerCard player={mockPlayer} />);

        expect(screen.getByText('Player')).toBeInTheDocument();
        expect(screen.getByText('WH-1000XM5')).toBeInTheDocument();
        expect(screen.getByText('Sony XM5')).toBeInTheDocument();
        expect(screen.getByText('Sony')).toBeInTheDocument();
        expect(screen.getByText('headphone')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });
});