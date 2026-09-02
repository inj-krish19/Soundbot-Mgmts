import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Disclaimer from '@/pages/legal/Disclaimer';

describe('Disclaimer Page - Integration', () => {

    it('renders the main heading', () => {
        render(<Disclaimer />);
        expect(screen.getByRole('heading', { name: /disclaimer/i })).toBeInTheDocument();
    });

    it('renders key sections', () => {
        render(<Disclaimer />);
        expect(screen.getByText('1. General Information')).toBeInTheDocument();
        expect(screen.getByText('2. No Professional Advice')).toBeInTheDocument();
        expect(screen.getByText('3. Accuracy of Data')).toBeInTheDocument();
        expect(screen.getByText('4. Limitation of Liability')).toBeInTheDocument();
        expect(screen.getByText('5. External Services')).toBeInTheDocument();
        expect(screen.getByText('6. Updates to This Disclaimer')).toBeInTheDocument();
    });

    it('renders substantial content', () => {
        render(<Disclaimer />);
        expect(screen.getByText(/intended for general informational and analytical purposes/i)).toBeInTheDocument();
        expect(screen.getByText(/should not be interpreted as professional/i)).toBeInTheDocument();
    });
});