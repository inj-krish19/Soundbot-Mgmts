export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

export const FRONTEND_URL =
    import.meta.env.VITE_FRONTEND_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:5173");