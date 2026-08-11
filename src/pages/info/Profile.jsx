import { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaSignOutAlt, FaChevronDown, FaChevronRight, FaShieldAlt } from "react-icons/fa";

import { BACKEND_URL } from "@/store/UrlStore";
import { responseHandler, errorHandler } from "@/utils/response-handler";

import Loading from "@/components/ui/Loading";
import NotFound from "@/pages/system/NotFound";
import Notification from "@/components/ui/Notification";


function Profile() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [activeSection, setActiveSection] = useState("profile");
    const [info, setInfo] = useState({
        message: "",
        type: ""
    });


    const main = async () => {
        try {

            setLoading(true);
            const res = await fetch(`${BACKEND_URL}/user/me`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            responseHandler(res.clone(), setInfo);
            if (!res.ok) {
                setData(null);
                return;
            }

            const response = await res.json();
            setData(response.data);

        } catch (err) {
            console.error(err);
            errorHandler(err, setInfo);
        } finally {
            setLoading(false);
        }

    };


    const handleChangeEmailRequest = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/auth/request-change-email`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include"
            });
            responseHandler(res.clone(), setInfo);
        } catch (err) {
            errorHandler(err, setInfo);
        }
    };


    const handleChangePasswordRequest = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/auth/request-change-password`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                credentials: "include"
            });
            responseHandler(res.clone(), setInfo);
        } catch (err) {
            errorHandler(err, setInfo);
        }
    };


    useEffect(() => {
        main();
    }, []);


    const sections = [
        { id: "profile", title: "Profile", icon: <FaUser /> },
        { id: "password", title: "Change Password", icon: <FaLock /> },
        { id: "email", title: "Change Email", icon: <FaEnvelope /> },
        { id: "security", title: "Security", icon: <FaShieldAlt /> },
        { id: "signout", title: "Sign Out", icon: <FaSignOutAlt /> }
    ];


    const toggleSection = (id) => {
        setActiveSection(prev => prev === id ? "" : id);
    };

    if (loading) return <Loading />;
    if (!data) return <NotFound />;

    const content = {

        profile: <ProfileContent data={data} />,
        password: (
            <MagicLinkSection
                title="Change Password"
                description="We'll send a secure password change link to your registered email."
                button="Send Password Change Link"
                onClick={handleChangePasswordRequest}
            />
        ),
        email: (
            <MagicLinkSection
                title="Change Email"
                description="We'll send a secure email change link to your registered email."
                button="Send Email Change Link"
                onClick={handleChangeEmailRequest}
            />
        ),
        security: <SecurityContent />,
        signout: <SignOutContent />
    };


    return (

        <main className="min-h-screen w-full px-4 md:px-8 py-6 bg-stone-200 dark:bg-stone-800">
            <Notification info={info} />
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Profile & Account</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage your profile, account security and account settings.</p>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex gap-6 max-w-6xl">
                <aside className="flex flex-col w-64 h-fit p-2 rounded-md bg-stone-300 dark:bg-stone-700">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`
                                flex items-center gap-3 w-full px-4 py-3 rounded-md text-sm text-left transition
                                ${activeSection === section.id
                                    ? "bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 font-semibold"
                                    : "text-slate-700 dark:text-slate-300 hover:bg-stone-400 dark:hover:bg-stone-600"
                                }
                            `}
                        >
                            {section.icon}
                            {section.title}
                        </button>

                    ))}

                </aside>
                <section className="flex-1 min-w-0 rounded-md bg-stone-300 dark:bg-stone-700 p-6">
                    {content[activeSection]}
                </section>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden flex-col gap-2 w-full">
                {sections.map(section => (
                    <div key={section.id} className="overflow-hidden rounded-md bg-stone-300 dark:bg-stone-700">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center justify-between w-full px-4 py-4 text-left"
                        >
                            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {section.icon}
                                {section.title}
                            </div>
                            {activeSection === section.id
                                ? <FaChevronDown className="text-slate-800 dark:text-slate-200" />
                                : <FaChevronRight className="text-slate-800 dark:text-slate-200" />
                            }
                        </button>

                        {activeSection === section.id && (
                            <div className="px-4 pb-5 pt-2 border-t border-stone-400 dark:border-stone-600">
                                {content[section.id]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </main>
    );
}


/* Profile */
function ProfileContent({ data }) {
    return (
        <div className="flex flex-col gap-8">
            <SectionHeading
                title="Your Profile"
                description="View the information associated with your Soundbot Mgmts account."
            />
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <img
                    src={`${BACKEND_URL}${data.profile_picture}`}
                    alt="Profile"
                    className="size-28 rounded-full object-cover border-4 border-stone-400 dark:border-stone-600"
                />
                <div className="flex flex-col gap-4 w-full">
                    <ProfileField label="Name" value={data.name} />
                    <ProfileField label="Email" value={data.email} />
                    <ProfileField label="Nickname" value={data.nickname} />
                    <ProfileField label="Country" value={data.country} />
                </div>
            </div>
        </div>
    );
}

/* Magic Link */
function MagicLinkSection({ title, description, button, onClick }) {
    return (
        <div className="flex flex-col gap-8">
            <SectionHeading title={title} description={description} />
            <div className="flex flex-col gap-4 p-5 rounded-md bg-stone-200 dark:bg-stone-800">
                <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                        Secure verification required
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        A one-time secure link will be sent to your registered email address.
                    </p>
                </div>

                <button
                    onClick={onClick}
                    className="w-fit px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition"
                >
                    {button}
                </button>
            </div>
        </div>
    );
}


/* Security */
function SecurityContent() {
    return (
        <div className="flex flex-col gap-8">
            <SectionHeading
                title="Security"
                description="Keep your Soundbot Mgmts account protected."
            />
            <div className="flex items-start gap-4 p-5 rounded-md bg-stone-200 dark:bg-stone-800">
                <FaShieldAlt className="mt-1 shrink-0 text-emerald-500" />
                <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                        Account Protection
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        Keep your password private and use a strong password to protect your account.
                        Password and email changes require secure verification through your registered email.
                    </p>
                </div>
            </div>
        </div>
    );
}


/* Sign Out */
function SignOutContent() {
    return (
        <div className="flex flex-col gap-8">
            <SectionHeading
                title="Sign Out"
                description="End your current Soundbot Mgmts session."
            />
            <div className="p-5 rounded-md bg-stone-200 dark:bg-stone-800">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    You can safely sign out from your current account session.
                </p>
                <button
                    onClick={() => window.location.href = "/sign-out"}
                    className="px-4 py-2 rounded-md bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}


/* Reusable */
function ProfileField({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-stone-400 dark:border-stone-600 pb-3">
            <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {label}
            </span>
            <span className="text-sm break-all text-slate-800 dark:text-slate-200">
                {value || "-"}
            </span>
        </div>
    );
}


function SectionHeading({ title, description }) {
    return (
        <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}


export default Profile;