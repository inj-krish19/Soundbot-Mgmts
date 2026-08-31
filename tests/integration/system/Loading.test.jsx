import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Loading from '@/pages/system/Loading';

describe('Loading Page - Integration', () => {

    it('renders the loading message', () => {
        render(<Loading />);

        expect(screen.getByText('Listen till it loads')).toBeInTheDocument();
    });

    it('renders the wait text', () => {
        render(<Loading />);

        expect(
            screen.getByText(/Wait a moment, much closer to Loading/i)
        ).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        const { container } = render(<Loading />);
        expect(container).toBeTruthy();
    });
});