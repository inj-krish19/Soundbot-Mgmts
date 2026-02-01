function Preview() {

    return (
        <>
            <section className="flex flex-col-reverse md:flex-row justify-center items-center gap-8 px-4 md:px-8 py-16">
                <div className="md:w-6/10 flex flex-row gap-4 justify-around flex-wrap">
                    <img src='/player/earphone.png' className="size-48 self-center rounded-4xl border border-teal-600" />
                    <img src='/player/earbud.png' className="size-48 self-center rounded-4xl border border-teal-600" />
                    <img src='/player/headphone.png' className="size-48 self-center rounded-4xl border border-teal-600" />
                </div>
                <span className="md:w-4/10 uppercase text-5xl text-white text-center font-poppins font-bold">Streaming Players</span>
            </section>
        </>
    );

}

export default Preview;