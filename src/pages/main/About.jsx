import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io'
import { Link } from 'react-router'

function About() {

    const sections = [
        { title: "Who we are", description: 'Soundbot Mgmts is a data-driven platform designed to help users understand and improve how they use headphones and earphones in their everyday digital lives. We focus on transforming passive listening activity into meaningful, actionable insights.' },
        { title: "What problem we solve", description: 'Most users are unaware of how long, how often, or how intensely they use audio devices across streaming platforms. This lack of visibility can lead to unhealthy listening habits, reduced productivity, and long-term hearing risks. Soundbot bridges this gap by monitoring usage patterns and presenting them in a clear, visual, and easy-to-understand format.' },
        { title: "Who we do", description: 'Soundbot automatically tracks listening activity, analyzes usage behavior, and delivers insights through intuitive dashboards and reports. From daily usage summaries to trend analysis and visual charts, we help users make informed decisions about their audio habits without manual tracking.' },
        { title: "Who it matters", description: 'Audio devices are deeply integrated into modern work, entertainment, and communication. By providing transparency and awareness, Soundbot empowers users to build healthier listening routines, optimize device usage, and stay informed about their digital well-being.' },
        { title: "Our Approach", description: 'We are built on modern, scalable technologies with a strong emphasis on privacy, security, and performance. User data is handled responsibly, insights are generated intelligently, and the platform is designed to evolve alongside user needs.' },
        { title: "Our Vision", description: 'Our vision is to become the standard platform for audio usage intelligence—helping individuals and organizations understand listening behavior, improve digital wellness, and make smarter decisions powered by data.' },
    ];

    const links = [
        { component: <FaGithub className='text-black dark:text-white hover:text-violet-400' size={24} />, link: 'https://github.com/inj-krish19/' },
        { component: <FaLinkedin className='text-black dark:text-white hover:text-violet-400' size={24} />, link: 'https://www.linkedin.com/in/inj-krish19/' },
        { component: <FaFacebook className='text-black dark:text-white hover:text-violet-400' size={24} />, link: 'https://www.facebook.com/inj.krish19/' },
        { component: <FaInstagram className='text-black dark:text-white hover:text-violet-400' size={24} />, link: 'https://www.instagram.com/inj_krish19/' },
        { component: <IoMdMail className='text-black dark:text-white hover:text-violet-400' size={24} />, link: 'mailto:kglivee19@gmail.com' },

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

                <div className="flex w-full border-2 border-t-emerald-600 border-b-sky-600 opacity-50 rounded-full"></div>

                <span className='text-slate-900 dark:text-slate-100 font-bold font-poppins text-lg'>Team</span>

                <div className="flex flex-col md:flex-row items-center px-4 md:px-8 py-8 gap-8">
                    <img src="https://scontent.famd4-1.fna.fbcdn.net/v/t39.30808-1/450385511_1021522579591605_8648500625122602823_n.jpg?stp=c0.0.1536.1536a_dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=rKMn93XZ1ScQ7kNvwGhBmZK&_nc_oc=Adkr1akyrDPTPQZDDNjyPnZpGIaLCulY7h3xIl7qICVb0tqxviS09zFbcpekw-op0Ww&_nc_zt=24&_nc_ht=scontent.famd4-1.fna&_nc_gid=Qjfyj-kqIFI4EVG_ymjZkw&oh=00_AftYx3ha6E7qX43sUTTfYZ2WK7_QYYyakGLRmA9C20KzAA&oe=698601C9" className='size-64 border border-indigo-400 p-2 rounded-sm' />

                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col">
                            <span className='text-sky-400 font-bold text-lg capitalize font-poppins'>Krish Shah</span>
                            <span className='text-emerald-400 font-bold text-sm font-sans '>Cofounder - Soundbot Mgmts, Fullstack Developer</span>
                        </div>

                        <p className='text-slate-800 dark:text-slate-200 text-sm'>Krish Shah, is a solo developer have skills to build frontend, backend and AI/ML related analytics.</p>

                        <p className='text-slate-800 dark:text-slate-200 text-sm'>
                            <span className='text-slate-900 dark:text-slate-100 !text-md'>Idea Intiative: </span>
                            The Idea of Soundbot Mgtms has been on the mind since 2023 when I bought my first headphones, I was always curious about mananging my tiny details that helps to take vital decision and judge product based on performance. Noticed that industry doesn't have any application who gives this facility to track the usage of your player whom you use like your friend.
                        </p>

                        <p className='text-slate-800 dark:text-slate-200 text-sm'>
                            Yeah this idea seems trash and don't have any potential to grow but its build as managing and tracking the usage. So currently the idea is about to track the details, later the scope thought near AI Insights that in a way if you use it harmful way it gives you suitable suggestion.
                        </p>

                        <p className='text-slate-800 dark:text-slate-200 text-sm font-bold'>
                            Feel free to be part of this journey, below links will be helpful for that:
                        </p>

                        <div className="flex flex-row gap-4 justify-start items-center">

                            {links.map((link, index) => {
                                return (<Link className="flex flex-row" to={link.link} key={index}>
                                    {link.component}
                                </Link>);
                            })}
                        </div>


                    </div>
                </div>
            </div>
        </>
    );

}

export default About;