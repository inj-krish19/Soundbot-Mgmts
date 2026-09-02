import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import UpdateNChanges from '@/pages/legal/UpdateNChanges';

describe('UpdateNChanges Page - Integration', () => {

    it('renders the main heading', () => {
        render(<UpdateNChanges />);
        expect(screen.getByRole('heading', { name: /updates & changes/i })).toBeInTheDocument();
    });

    it('renders update sections', () => {
        render(<UpdateNChanges />);
        expect(screen.getByText('Latest Update')).toBeInTheDocument();
        expect(screen.getByText('Previous Update')).toBeInTheDocument();
        expect(screen.getByText('Earlier Update')).toBeInTheDocument();
        expect(screen.getByText('Feature Enhancement')).toBeInTheDocument();
        expect(screen.getByText('Initial Release')).toBeInTheDocument();
    });

    it('renders substantial content', () => {
        render(<UpdateNChanges />);
        expect(screen.getByText(/major updates, feature improvements/i)).toBeInTheDocument();
        expect(screen.getByText(/OAuth authentication support/i)).toBeInTheDocument();
        expect(screen.getByText(/Core platform launch/i)).toBeInTheDocument();
    });
});