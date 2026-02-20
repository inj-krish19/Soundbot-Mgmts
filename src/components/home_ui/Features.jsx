function Features() {

    const features = [
        { color: 'bg-sky-500', title: 'Usage Tracking', content: "Automatically monitor daily headphone and earphone usage across supported streaming activity." },
        { color: 'bg-emerald-500', title: 'Visual Analytics', content: "Understand your listening behavior through clean charts, timelines, and interactive insights." },
        { color: 'bg-rose-500', title: 'AI Powered Insights', content: "Receive intelligent summaries and pattern detection to improve long - term listening habits." },
        { color: 'bg-purple-500', title: 'Health Focused Monitoring', content: "Identify overuse trends and maintain healthier audio consumption with informed decisions." },
        // { color: 'bg-amber', title: 'Secure & Private by Design', content: "Your usage data is encrypted, controlled by you, and never shared without permission." },
    ]

    return (
        <>
            <section className="flex flex-col gap-8 px-4 md:px-8 py-16">

                <span className="font-poppins text-2xl text-center font-bold text-indigo-400">Features</span>
                <p className="md:px-12 font-inter text-md text-slate-700 dark:text-slate-300 ">
                    <span className="text-2xl text-emerald-400 dark:text-sky-400 font-bold font-poppins font-italic">Soundbot solves problem of, </span>
                    people use headphones for hours without visibility into listening duration, frequency, or long-term impact. Soundbot bridges this gap by monitoring daily usage, organizing it into structured data, and presenting clear visual reports—so users can make informed decisions about their listening habits.
                </p>
                <div className="flex flex-wrap flex-row px-4 py-2 gap-8 md:gap-4 justify-around items-center">
                    {
                        features.map(feature => {
                            return (
                                <div className={`p-3 flex flex-col gap-4 size-60 md:size-48 rounded-md justify-center items-center ` + feature.color} key={feature.title}>
                                    <span className="text-center text-slate-200 text-md font-inter font-bold">{feature.title}</span>
                                    <p className="text-slate-300 text-sm">{feature.content}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );

}

export default Features;