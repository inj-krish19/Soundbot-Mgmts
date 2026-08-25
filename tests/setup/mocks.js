import { vi } from 'vitest';

/**
 * Proper fetch mock that supports res.clone() and res.json()
 */
export const mockFetch = (data, status = 200) => {
    global.fetch = vi.fn(() => {
        const responseBody = JSON.stringify(data);

        const response = {
            ok: status >= 200 && status < 300,
            status,
            statusText: status === 200 ? 'OK' : 'Error',
            headers: {
                get: () => 'application/json',
            },
            json: () => Promise.resolve(data),
            text: () => Promise.resolve(responseBody),
            clone: function () {
                // Return a new object with the same methods
                return {
                    ok: this.ok,
                    status: this.status,
                    statusText: this.statusText,
                    headers: this.headers,
                    json: () => Promise.resolve(data),
                    text: () => Promise.resolve(responseBody),
                    clone: this.clone,
                };
            },
        };

        return Promise.resolve(response);
    });
};

/**
 * Always make fetch a spy (even when we don't care about the response)
 */
export const mockFetchEmpty = () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({}),
            text: () => Promise.resolve('{}'),
            clone: function () {
                return this;
            },
        })
    );
};

export const mockAuthSuccess = () => {
    mockFetch({ authenticated: true });
};

export const mockAuthFail = () => {
    mockFetch({ authenticated: false }, 401);
};

export const resetMocks = () => {
    vi.clearAllMocks();
    // Always restore fetch as a spy so .toHaveBeenCalled() works
    global.fetch = vi.fn();
};