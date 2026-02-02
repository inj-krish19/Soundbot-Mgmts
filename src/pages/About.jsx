function About() {

    const sections = [
        { title: "Who we are", description: 'Soundbot Mgmts is a data-driven platform designed to help users understand and improve how they use headphones and earphones in their everyday digital lives. We focus on transforming passive listening activity into meaningful, actionable insights.' },
        { title: "What problem we solve", description: 'Most users are unaware of how long, how often, or how intensely they use audio devices across streaming platforms. This lack of visibility can lead to unhealthy listening habits, reduced productivity, and long-term hearing risks. Soundbot bridges this gap by monitoring usage patterns and presenting them in a clear, visual, and easy-to-understand format.' },
        { title: "Who we do", description: 'Soundbot automatically tracks listening activity, analyzes usage behavior, and delivers insights through intuitive dashboards and reports. From daily usage summaries to trend analysis and visual charts, we help users make informed decisions about their audio habits without manual tracking.' },
        { title: "Who it matters", description: 'Audio devices are deeply integrated into modern work, entertainment, and communication. By providing transparency and awareness, Soundbot empowers users to build healthier listening routines, optimize device usage, and stay informed about their digital well-being.' },
        { title: "Our Approach", description: 'We are built on modern, scalable technologies with a strong emphasis on privacy, security, and performance. User data is handled responsibly, insights are generated intelligently, and the platform is designed to evolve alongside user needs.' },
        { title: "Our Vision", description: 'Our vision is to become the standard platform for audio usage intelligence—helping individuals and organizations understand listening behavior, improve digital wellness, and make smarter decisions powered by data.' },
    ];

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-8 px-4 md:px-8 py-2">
                <span className='text-slate-900 dark:text-slate-100 font-bold font-poppins text-lg'>About</span>

                <div className="grid grid-rows-6 py-4 gap-10 justify-items-center">
                    {sections.map(section => {
                        return (
                            <div className="flex flex-col w-4/5 gap-2 odd:text-left odd:col-span-2 even:col-start-2 even:text-right" key={section.title}>
                                <span className='text-sm uppercase tracking-wide text-indigo-600 font-semibold'>{section.title}</span>
                                <p className='texts-slate-700 dark:text-slate-300 text-sm leading-relaxed'>{section.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );

}

export default About;