import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Success from '@/pages/system/Success';

describe('Success Page - Integration', () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders default title when no props provided', () => {
        render(<Success />);

        expect(screen.getByText('Successfully Signed In')).toBeInTheDocument();
    });

    it('renders default message and advice note', () => {
        render(<Success />);

        expect(
            screen.getByText(/Thank you for signing in Soundbot Mgmts/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Your profile has been securely verified/i)
        ).toBeInTheDocument();
    });

    it('renders custom title, message and advice_note when provided', () => {
        render(
            <Success
                title="Account Created"
                message="Welcome to Soundbot!"
                advice_note="You can now explore your dashboard."
            />
        );

        expect(screen.getByText('Account Created')).toBeInTheDocument();
        expect(screen.getByText('Welcome to Soundbot!')).toBeInTheDocument();
        expect(screen.getByText('You can now explore your dashboard.')).toBeInTheDocument();
    });

    it('does not render default title when custom title is passed', () => {
        render(<Success title="Password Updated" />);

        expect(screen.getByText('Password Updated')).toBeInTheDocument();
        expect(screen.queryByText('Successfully Signed In')).not.toBeInTheDocument();
    });
});