import { describe, expect, it } from 'vitest';
import { BACKEND_URL, FRONTEND_URL } from '@/store/UrlStore';

describe('UrlStore - Unit', () => {
    it('exports BACKEND_URL as a string', () => {
        expect(typeof BACKEND_URL).toBe('string');
    });

    it('exports FRONTEND_URL as a string', () => {
        expect(typeof FRONTEND_URL).toBe('string');
        expect(FRONTEND_URL.length).toBeGreaterThan(0);
    });
});