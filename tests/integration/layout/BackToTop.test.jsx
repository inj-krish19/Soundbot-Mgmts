import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import userEvent from '@testing-library/user-event';
import BackToTop from '@/components/layout/BackToTop';

describe('BackToTop - Unit', () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();
    });

    it('renders back to top button', () => {
        render(<BackToTop />);

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('scrolls to top when clicked', async () => {
        const user = userEvent.setup();

        render(<BackToTop />);

        await user.click(screen.getByRole('button'));

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
    });
});