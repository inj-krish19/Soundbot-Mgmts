import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import DeviceCard from '@/components/device/DeviceCard';

const mockDevice = {
    _id: 'd1',
    name: 'MacBook Pro',
    nickname: 'Laptop',
    company: 'Apple',
    type: 'desktop',
};

describe('DeviceCard - Integration', () => {

    it('renders device details', () => {
        render(<DeviceCard device={mockDevice} />);

        expect(screen.getByText('Device')).toBeInTheDocument();
        expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
        expect(screen.getByText('Laptop')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('desktop')).toBeInTheDocument();
    });
});