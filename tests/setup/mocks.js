import { vi } from 'vitest';

export const createMockResponse = (data = {}, status = 200) => {
    return {
        ok: status >= 200 && status < 300,
        status,
        statusText: status >= 200 && status < 300 ? 'OK' : 'Error',
        headers: {
            get: vi.fn(() => 'application/json'),
        },
        json: vi.fn(() => Promise.resolve(data)),
        text: vi.fn(() => Promise.resolve(JSON.stringify(data))),
        clone() {
            return createMockResponse(data, status);
        },
    };
};

export const mockFetch = (data = {}, status = 200) => {
    global.fetch = vi.fn(() => Promise.resolve(createMockResponse(data, status)));
    return global.fetch;
};

export const mockFetchSequence = (...responses) => {
    global.fetch = vi.fn();

    responses.forEach(([data, status = 200]) => {
        global.fetch.mockResolvedValueOnce(createMockResponse(data, status));
    });

    return global.fetch;
};

export const resetMocks = () => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
};