import { describe, expect, it } from 'vitest';
import { render, screen } from '../../setup/test-utils';
import About from '@/pages/main/About';

describe('About Page - Integration', () => {

    it('renders the main About heading', () => {
        render(<About />);

        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders all section titles', () => {
        render(<About />);

        expect(screen.getByText('Who we are')).toBeInTheDocument();
        expect(screen.getByText('What problem we solve')).toBeInTheDocument();
        expect(screen.getByText('Who we do')).toBeInTheDocument();
        expect(screen.getByText('Who it matters')).toBeInTheDocument();
        expect(screen.getByText('Our Approach')).toBeInTheDocument();
        expect(screen.getByText('Our Vision')).toBeInTheDocument();
    });

    it('renders key section descriptions', () => {
        render(<About />);

        expect(
            screen.getByText(/Soundbot Mgmts is a data-driven platform designed to help users understand/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Most users are unaware of how long, how often, or how intensely they use audio devices/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Our vision is to become the standard platform for audio usage intelligence/i)
        ).toBeInTheDocument();
    });

    it('renders the Team section', () => {
        render(<About />);

        expect(screen.getByText('Team')).toBeInTheDocument();
        expect(screen.getByText('Krish Shah')).toBeInTheDocument();
        expect(
            screen.getByText(/Cofounder - Soundbot Mgmts, Fullstack Developer/i)
        ).toBeInTheDocument();
    });

    it('renders team bio and idea initiative content', () => {
        render(<About />);

        expect(
            screen.getByText(/Krish Shah, is a solo developer have skills to build frontend, backend and AI\/ML related analytics/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Idea Intiative/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Feel free to be part of this journey/i)
        ).toBeInTheDocument();
    });

    it('renders social and contact links', () => {
        render(<About />);

        const links = screen.getAllByRole('link');
        const hrefs = links.map((link) => link.getAttribute('href'));

        expect(hrefs).toContain('https://github.com/inj-krish19/');
        expect(hrefs).toContain('https://www.linkedin.com/in/inj-krish19/');
        expect(hrefs).toContain('https://www.facebook.com/inj.krish19/');
        expect(hrefs).toContain('https://www.instagram.com/inj_krish19/');
        expect(hrefs).toContain('mailto:kglivee19@gmail.com');
    });

    it('renders the team avatar image', () => {
        render(<About />);

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute(
            'src',
            'https://avatars.githubusercontent.com/u/133616289?v=4'
        );
    });
});