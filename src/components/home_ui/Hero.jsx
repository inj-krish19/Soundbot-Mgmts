function Hero() {

    return (
        <>
            <section className="flex flex-col-reverse md:flex-row items-center gap-12 px-4 md:px-8 py-16 max-w-7xl mx-auto">
                <img src='/logo.png' className='self-center size-48 lg:size-72 via-transparent' />

                <div className="flex flex-col gap-8">
                    <h1 className='text-sky-400 dark:text-emerald-400 font-poppins font-bold text-3xl lg:text-5xl'>Smarter audio usage, powered by insights.</h1>
                    <p className='text-slate-700 dark:text-slate-300 text-sm lg:text-lg font-inter font-bold'>Soundbot helps you understand how you use your headphones and earphones every day. By tracking listening time, patterns, and behavior, Soundbot transforms raw usage into meaningful insights that support healthier and more efficient audio habits.</p>

                </div>
            </section>
        </>
    );

}

export default Hero;