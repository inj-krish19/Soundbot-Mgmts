import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import TermsConditions from '@/pages/legal/TermsConditions';

describe('TermsConditions Page - Integration', () => {

    it('renders the main heading', () => {
        render(<TermsConditions />);
        expect(screen.getByRole('heading', { name: /terms and conditions/i })).toBeInTheDocument();
    });

    it('renders key sections', () => {
        render(<TermsConditions />);
        expect(screen.getByText('1. Acceptance of Terms')).toBeInTheDocument();
        expect(screen.getByText('2. User Responsibilities')).toBeInTheDocument();
        expect(screen.getByText('3. Prohibited Activities')).toBeInTheDocument();
        expect(screen.getByText('4. Service Availability')).toBeInTheDocument();
        expect(screen.getByText('5. Changes to the Terms')).toBeInTheDocument();
        expect(screen.getByText('6. Limitation of Liability')).toBeInTheDocument();
        expect(screen.getByText('7. Contact')).toBeInTheDocument();
    });

    it('renders substantial content', () => {
        render(<TermsConditions />);
        expect(screen.getByText(/By accessing or using our services/i)).toBeInTheDocument();
        expect(screen.getByText(/Provide accurate account information/i)).toBeInTheDocument();
    });
});