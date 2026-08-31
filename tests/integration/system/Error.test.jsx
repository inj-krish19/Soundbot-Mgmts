import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Error from '@/pages/system/Error';

describe('Error Page - Integration', () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders default title when no props provided', () => {
        render(<Error />);

        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('renders default message and advice note', () => {
        render(<Error />);

        expect(
            screen.getByText(/We ran into a temporary server issue while signing you in/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Please wait a moment and retry/i)
        ).toBeInTheDocument();
    });

    it('renders custom title, message and advice_note when provided', () => {
        render(
            <Error
                title="Custom Error Title"
                message="Custom error message here."
                advice_note="Custom advice note here."
            />
        );

        expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
        expect(screen.getByText('Custom error message here.')).toBeInTheDocument();
        expect(screen.getByText('Custom advice note here.')).toBeInTheDocument();
    });

    it('does not render default title when custom title is passed', () => {
        render(<Error title="Auth Failed" />);

        expect(screen.getByText('Auth Failed')).toBeInTheDocument();
        expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    });
});