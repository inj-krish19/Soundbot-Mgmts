import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Warning from '@/pages/system/Warning';

describe('Warning Page - Integration', () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders default title when no props provided', () => {
        render(<Warning />);

        expect(
            screen.getByText("Sign-in couldn't be completed")
        ).toBeInTheDocument();
    });

    it('renders default message and advice note', () => {
        render(<Warning />);

        expect(
            screen.getByText(/We couldn't finish signing you in because some required information/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/No changes were made to your account/i)
        ).toBeInTheDocument();
    });

    it('renders custom title, message and advice_note when provided', () => {
        render(
            <Warning
                title="Custom Warning"
                message="Something needs your attention."
                advice_note="Please review and try again."
            />
        );

        expect(screen.getByText('Custom Warning')).toBeInTheDocument();
        expect(screen.getByText('Something needs your attention.')).toBeInTheDocument();
        expect(screen.getByText('Please review and try again.')).toBeInTheDocument();
    });

    it('does not render default title when custom title is passed', () => {
        render(<Warning title="OAuth Incomplete" />);

        expect(screen.getByText('OAuth Incomplete')).toBeInTheDocument();
        expect(
            screen.queryByText("Sign-in couldn't be completed")
        ).not.toBeInTheDocument();
    });
});