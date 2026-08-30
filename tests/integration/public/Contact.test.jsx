import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import Contact from '@/pages/main/Contact';

describe('Contact Page - Integration', () => {

    it('renders the main Contact heading', () => {
        render(<Contact />);

        expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('renders the get-in-touch section', () => {
        render(<Contact />);

        expect(
            screen.getByText('Get in Touch with Soundbot')
        ).toBeInTheDocument();

        expect(
            screen.getByText(/We're here to help you understand, manage, and improve your audio usage experience/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Whether you have a question, feedback, or need assistance with your Soundbot account/i)
        ).toBeInTheDocument();
    });

    it('renders the Official Pages heading', () => {
        render(<Contact />);

        expect(screen.getByText('Official Pages')).toBeInTheDocument();
    });

    it('renders all official contact links with correct hrefs', () => {
        render(<Contact />);

        const links = screen.getAllByRole('link');
        const hrefs = links.map((link) => link.getAttribute('href'));

        expect(hrefs).toContain('https://www.linkedin.com/');
        expect(hrefs).toContain('https://www.facebook.com/');
        expect(hrefs).toContain('https://www.instagram.com/');
        expect(hrefs).toContain('mailto:support@soudbot.com');
    });

    it('renders official page labels in the link text', () => {
        render(<Contact />);

        // Links are rendered as "Icon - url"
        expect(screen.getByText(/linkedin\.com/i)).toBeInTheDocument();
        expect(screen.getByText(/facebook\.com/i)).toBeInTheDocument();
        expect(screen.getByText(/instagram\.com/i)).toBeInTheDocument();
        expect(screen.getByText(/support@soudbot\.com/i)).toBeInTheDocument();
    });

    it('renders player images', () => {
        render(<Contact />);

        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThanOrEqual(2);

        const srcs = images.map((img) => img.getAttribute('src'));
        expect(srcs).toContain('/player/earphone.png');
        expect(srcs).toContain('/player/headphone.png');
    });
});