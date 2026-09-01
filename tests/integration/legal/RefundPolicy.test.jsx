import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import RefundPolicy from '@/pages/legal/RefundPolicy';

describe('RefundPolicy Page - Integration', () => {

    it('renders the main heading', () => {
        render(<RefundPolicy />);
        expect(screen.getByRole('heading', { name: /refund policy/i })).toBeInTheDocument();
    });

    it('renders key sections', () => {
        render(<RefundPolicy />);
        expect(screen.getByText('1. Eligibility for Refund')).toBeInTheDocument();
        expect(screen.getByText('2. Non-Refundable Cases')).toBeInTheDocument();
        expect(screen.getByText('3. Refund Request Process')).toBeInTheDocument();
        expect(screen.getByText('4. Processing Time')).toBeInTheDocument();
        expect(screen.getByText('5. Contact Support')).toBeInTheDocument();
    });

    it('renders substantial content', () => {
        render(<RefundPolicy />);
        expect(screen.getByText(/conditions under which refunds may be issued/i)).toBeInTheDocument();
        expect(screen.getByText(/7 days of the transaction/i)).toBeInTheDocument();
    });
});