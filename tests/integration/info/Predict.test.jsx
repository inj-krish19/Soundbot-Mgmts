import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Predict from '@/pages/info/Predict';

describe('Predict Page - Integration', () => {
    it('renders without crashing', () => {
        render(<Predict />);
        expect(screen.getByText('Predict')).toBeInTheDocument();
    });
});