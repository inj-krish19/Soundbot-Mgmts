import { Link } from 'react-router';
import { IoMdMail } from 'react-icons/io';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Contact() {

    const links = [
        { title: "Facebook", component: <FaLinkedin className='text-black dark:text-white hover:text-emerald-400' size={24} />, link: 'https://www.linkedin.com/' },
        { title: "LinkedIn", component: <FaFacebook className='text-black dark:text-white hover:text-emerald-400' size={24} />, link: 'https://www.facebook.com/' },
        { title: "Instagram", component: <FaInstagram className='text-black dark:text-white hover:text-emerald-400' size={24} />, link: 'https://www.instagram.com/' },
        { title: "Mail", component: <IoMdMail className='text-black dark:text-white hover:text-emerald-400' size={24} />, link: 'mailto:support@soudbot.com' },

    ];

    return (
        <>
            <main className='flex flex-col min-h-screen h-full w-full gap-12 px-4 md:px-8 py-4'>
                <span className='text-slate-900 dark:text-slate-100 font-poppins text-lg font-bold text-center'>Contact</span>

                <div className="flex flex-col md:flex-row gap-8 px-8 justify-center items-center">

                    <img src='/player/earphone.png' className="size-48 self-center rounded-4xl border border-teal-600" />

                    <div className="flex flex-col gap-2">
                        <span className='text-slate-800 dark:text-slate-200 text-md font-bold'>Get in Touch with Soundbot</span>
                        <p className='text-slate-800 dark:text-slate-200 text-sm'>We're here to help you understand, manage, and improve your audio usage experience.</p>
                        <p className='text-slate-800 dark:text-slate-200 text-sm'>
                            Whether you have a question, feedback, or need assistance with your Soundbot account, our team is always ready to help. Reach out to us and we'll make sure your concerns are addressed promptly and securely.
                        </p>
                    </div>
                </div>

                <span className='text-slate-900 dark:text-slate-100 font-poppins text-lg font-bold text-center'>Official Pages</span>

                <div className="flex flex-col md:flex-row gap-8 px-8 justify-center items-center">
                    <img src='/player/headphone.png' className="size-48 self-center rounded-4xl border border-teal-600" />

                    <div className="flex flex-col gap-2">
                        {links.map(link => {
                            return (<Link key={link.link} to={link.link} className='flex flex-row text-slate-800 dark:text-slate-200 hover:text-emerald-400 font-bold justify-center items-center'>
                                {link.component} - {link.link}
                            </Link>);
                        })}
                    </div>

                    <img src='/player/earphone.png' className="size-48 self-center rounded-4xl border border-teal-600" />
                </div>
            </main>
        </>
    );

}

export default Contact;
