function HowItWorks() {

    const steps = [
        { step: 1, title: 'Sign In', description: 'Sign In on Soundbot Mgmts with Email Verification or Continue with Platforms' },
        { step: 2, title: 'Create Player', description: 'Create Streaming Player for storing the details of player, usage sessions and charging info' },
        { step: 3, title: 'Create Device', description: 'Create Digital Device for storing the details of the device that access the player in session' },
        { step: 4, title: 'Create Sessions', description: 'Create Session and provide the details as per the conventional use of streaming player (ex. volume, start time, end time)' },
        { step: 5, title: 'Create Charging', description: 'Create Charging and provide ranges of first and last date for tracking usage (note: if chargeless device then you set charging as usage range)' },
        { step: 6, title: 'Dashboard', description: 'Visualize Charts in order to get track the details of session, player and usage' },
        { step: 7, title: 'AI Insights', description: 'Access AI Isights that helps you to use the streaming player, so you can listen making sure without damage' },
        { step: 8, title: 'Report Generation', description: 'Generate the reports for data available on platform so can be accessed anywhere portably, analyse and store as document' },
    ];

    return (
        <>
            <section className="flex flex-col gap-8 px-4 md:px-8 py-16">
                <span className="text-slate-700 dark:text-slate-300 font-poppins font-bold text-3xl text-center">How It Works</span>
                <div className="flex flex-row flex-wrap gap-8 justify-around items-center px-4">
                    {
                        steps.map(step => {
                            return (
                                <div className="flex flex-col gap-4 rounded-md bg-violet-400 justify-center items-center p-4 size-72 " key={step.step}>
                                    <span className="rounded-full p-3 bg-violet-500 font-bold font-poppins text-fuchsia-400">{step.step}</span>
                                    <span className="text-slate-100 font-poppins text-cenetr font-bold">{step.title}</span>
                                    <p className="text-slate-200 font-inter text-center text-sm">{step.description}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );

}

export default HowItWorks;
