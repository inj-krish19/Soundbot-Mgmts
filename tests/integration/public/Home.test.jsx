import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Home from '@/pages/main/Home';

describe('Home Page - Integration', () => {

    it('renders the main hero content', () => {
        render(<Home />);

        expect(
            screen.getByText('Smarter audio usage, powered by insights.')
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Soundbot helps you understand how you use your headphones/i)
        ).toBeInTheDocument();
    });

    it('renders the Features section', () => {
        render(<Home />);

        expect(screen.getByText('Features')).toBeInTheDocument();
        expect(screen.getByText('Usage Tracking')).toBeInTheDocument();
        expect(screen.getByText('Visual Analytics')).toBeInTheDocument();
        expect(screen.getByText('AI Powered Insights')).toBeInTheDocument();
        expect(screen.getByText('Health Focused Monitoring')).toBeInTheDocument();
    });

    it('renders the achievements and capability section', () => {
        render(<Home />);

        expect(
            screen.getByText('Built for scale, trust, and insight')
        ).toBeInTheDocument();

        expect(screen.getByText('900+')).toBeInTheDocument();

        expect(
            screen.getByText('Active users accessing Soundbot insights')
        ).toBeInTheDocument();
    });

    it('renders the streaming players preview', () => {
        render(<Home />);

        expect(screen.getByText('Streaming Players')).toBeInTheDocument();
    });

    it('renders the How It Works section', () => {
        render(<Home />);

        expect(screen.getByText('How It Works')).toBeInTheDocument();

        expect(screen.getByText('Sign In')).toBeInTheDocument();
        expect(screen.getByText('Create Player')).toBeInTheDocument();
        expect(screen.getByText('Create Device')).toBeInTheDocument();
        expect(screen.getByText('Create Sessions')).toBeInTheDocument();
        expect(screen.getByText('Create Charging')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('AI Insights')).toBeInTheDocument();
        expect(screen.getByText('Report Generation')).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        const { container } = render(<Home />);
        expect(container).toBeTruthy();
    });
});