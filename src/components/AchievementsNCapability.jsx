function AchievementsNCapability() {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">

            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-poppins font-semibold text-slate-900 dark:text-slate-100">
                    Built for scale, trust, and insight
                </h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto ">
                    Soundbot is engineered with modern, scalable technologies, focusing on
                    performance, security, and long-term growth.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center">

                <div className="flex flex-col flex-wrap gap-8 md:w-1/2">

                    <div className="flex flex-row flex-wrap lg:no-wrap justify-around items-center gap-6 text-center">
                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-3xl font-bold text-emerald-500">#1</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Monitoring headphone and streaming usage
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-3xl font-bold text-emerald-500">900+</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Active users accessing Soundbot insights
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-3xl font-bold text-emerald-500">1st</p>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Usage visualization focused audio analytics
                            </p>
                        </div>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        From authentication to analytics, every system is designed to scale
                        securely while maintaining reliability and performance as user
                        adoption grows.
                    </p>
                </div>

                <div className="flex flex-col md:w-1/2 gap-8 items-center">

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-center md:text-left">
                        Soundbot automatically tracks streaming activity, analyzes behavior
                        patterns, and delivers AI-assisted insights through intuitive
                        dashboards—without requiring manual input.
                    </p>

                    <span className="text-sky-400 dark:text-emerald-400 text-lg font-poppins">Soundbot have some in app cute characters like,</span>
                    <div className="flex flex-row flex-wrap justify-around items-center gap-6">
                        <img src={`${BACKEND_URL}/PFPs/bleep.png`} className="size-28 rounded-full border border-slate-200 dark:border-slate-700" />
                        <img src={`${BACKEND_URL}/PFPs/wav.png`} className="size-28 rounded-full border border-slate-200 dark:border-slate-700" />
                        <img src={`${BACKEND_URL}/PFPs/ohm.png`} className="size-28 rounded-full border border-slate-200 dark:border-slate-700" />
                        <img src={`${BACKEND_URL}/PFPs/vinnies_spin.png`} className="size-28 rounded-full border border-slate-200 dark:border-slate-700" />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AchievementsNCapability;
