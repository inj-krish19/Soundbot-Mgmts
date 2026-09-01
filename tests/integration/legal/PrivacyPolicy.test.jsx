import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';

describe('PrivacyPolicy Page - Integration', () => {

    it('renders the main heading', () => {
        render(<PrivacyPolicy />);
        expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
    });

    it('renders key sections', () => {
        render(<PrivacyPolicy />);
        expect(screen.getByText('1. Information We Collect')).toBeInTheDocument();
        expect(screen.getByText('2. How We Use Information')).toBeInTheDocument();
        expect(screen.getByText('3. Data Storage and Security')).toBeInTheDocument();
        expect(screen.getByText('4. Data Sharing')).toBeInTheDocument();
        expect(screen.getByText('5. User Rights')).toBeInTheDocument();
        expect(screen.getByText('6. Policy Updates')).toBeInTheDocument();
        expect(screen.getByText('7. Contact')).toBeInTheDocument();
    });

    it('renders substantial content about Soundbot Mgmts', () => {
        render(<PrivacyPolicy />);
        expect(screen.getByText(/protecting user privacy is an important priority/i)).toBeInTheDocument();
        expect(screen.getByText(/does not sell or rent personal information/i)).toBeInTheDocument();
    });
});