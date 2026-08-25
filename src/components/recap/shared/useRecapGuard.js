/**
 * useRecapGuard
 * Validates the URL params against the currently unlocked recap window.
 * Works for both monthly and yearly.
 *
 * Rules:
 *   "monthly" — previous month, visible days 1-7 of the current month
 *               e.g. May recap → visible June 1-7
 *
 *   "yearly"  — previous year, visible Jan 1-7 only
 *               e.g. 2025 recap → visible Jan 1-7 2026
 *
 * Usage:
 *   const { allowed } = useRecapGuard("monthly", year, month)
 *   const { allowed } = useRecapGuard("yearly",  year)
 *
 * Returns:
 *   { allowed: true,  recapMonth, recapYear }  — for monthly
 *   { allowed: true,  recapYear }              — for yearly
 *   { allowed: false }                         — anything else
 */
const useRecapGuard = (type, paramYear, paramMonth) => {
    const now = new Date()
    const today = now.getDate()
    const month = now.getMonth()      // 0-indexed
    const year = now.getFullYear()

    /* Window check: must be within days 1-7 */
    // return { allowed: true } // - debug only
    if (today > 7) return { allowed: false }

    if (type === "monthly") {
        const recapMonth = month === 0 ? 12 : month   // 1-indexed previous month
        const recapYear = month === 0 ? year - 1 : year

        const reqMonth = parseInt(paramMonth, 10)
        const reqYear = parseInt(paramYear, 10)

        if (reqMonth !== recapMonth || reqYear !== recapYear) return { allowed: false }
        return { allowed: true, recapMonth, recapYear }
    }

    if (type === "yearly") {
        /* Yearly window: January only */
        if (month !== 0) return { allowed: false }

        const recapYear = year - 1
        const reqYear = parseInt(paramYear, 10)

        if (reqYear !== recapYear) return { allowed: false }
        return { allowed: true, recapYear }
    }

    return { allowed: false }
}

export default useRecapGuard