import { describe, expect, it, beforeEach } from 'vitest';
import details from '@/store/DetailsStore';

describe('DetailsStore - Unit', () => {
    beforeEach(() => {
        details.setState({ nickname: '....' });
    });

    it('defaults nickname to placeholder', () => {
        expect(details.getState().nickname).toBe('....');
    });

    it('setNickname updates nickname', () => {
        details.getState().setNickname('inj');
        expect(details.getState().nickname).toBe('inj');
    });
});