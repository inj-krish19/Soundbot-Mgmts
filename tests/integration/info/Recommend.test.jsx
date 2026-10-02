import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Recommend from '@/pages/info/Recommend';

describe('Recommend Page - Integration', () => {
    it('renders without crashing', () => {
        render(<Recommend />);
        expect(screen.getByText('Recommend')).toBeInTheDocument();
    });
});