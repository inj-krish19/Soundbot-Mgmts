import { describe, expect, it, beforeEach } from 'vitest';
import useAuth from '@/store/AuthStore';

describe('AuthStore - Unit', () => {
    beforeEach(() => {
        useAuth.setState({ auth: false });
    });

    it('defaults auth to false', () => {
        expect(useAuth.getState().auth).toBe(false);
    });

    it('setAuth updates auth status to true', () => {
        useAuth.getState().setAuth(true);
        expect(useAuth.getState().auth).toBe(true);
    });

    it('setAuth can toggle back to false', () => {
        useAuth.getState().setAuth(true);
        useAuth.getState().setAuth(false);
        expect(useAuth.getState().auth).toBe(false);
    });
});