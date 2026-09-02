import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Suggestions from '@/pages/legal/Suggestions';

describe('Suggestions Page - Integration', () => {

    it('renders the main heading', () => {
        render(<Suggestions />);
        expect(screen.getByRole('heading', { name: /suggestions & feedback/i })).toBeInTheDocument();
    });

    it('renders key sections', () => {
        render(<Suggestions />);
        expect(screen.getByText('Why Your Feedback Matters')).toBeInTheDocument();
        expect(screen.getByText('How to Submit a Suggestion')).toBeInTheDocument();
        expect(screen.getByText('What to Include in Your Suggestion')).toBeInTheDocument();
        expect(screen.getByText('Our Commitment')).toBeInTheDocument();
    });

    it('renders substantial content', () => {
        render(<Suggestions />);
        expect(screen.getByText(/We value feedback from our users/i)).toBeInTheDocument();
        expect(screen.getByText(/Thank you for helping us make our platform better/i)).toBeInTheDocument();
    });
});