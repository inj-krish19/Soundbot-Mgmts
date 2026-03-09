import React from "react";

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Privacy Policy
                </h1>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    At <strong>Soundbot Mgmts</strong>, protecting user privacy is an
                    important priority. This Privacy Policy explains how information is
                    collected, used, stored, and protected when users interact with our
                    application and services.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    1. Information We Collect
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    Depending on how the application is used, we may collect:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>User account and authentication related information.</li>
                    <li>Session activity data such as duration and usage timestamps.</li>
                    <li>Interaction data used to generate analytics dashboards.</li>
                    <li>Technical data including device or browser environment.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    2. How We Use Information
                </h2>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>To maintain core functionality of the application.</li>
                    <li>To generate usage analytics and insights.</li>
                    <li>To improve performance and reliability.</li>
                    <li>To detect and prevent misuse or security risks.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    3. Data Storage and Security
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Reasonable technical and organizational measures are implemented to
                    protect data from unauthorized access, alteration, loss, or misuse.
                    Access to stored information is limited to necessary operational
                    processes.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    4. Data Sharing
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Soundbot Mgmts does not sell or rent personal information. Information
                    may only be shared when required by law or when necessary to provide
                    essential application functionality.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    5. User Rights
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Users may request access, correction, or deletion of their personal
                    data where applicable. Requests can be submitted through the support
                    or feedback section within the application.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    6. Policy Updates
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    This policy may be updated periodically to reflect operational,
                    technical, or regulatory changes. Updated versions will always be
                    available within the application.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    7. Contact
                </h2>

                <p className="text-sm sm:text-base leading-relaxed">
                    For questions regarding this Privacy Policy, please contact the
                    Soundbot Mgmts support team through the application's support or
                    feedback channels.
                </p>

            </div>
        </div>
    );
}

export default PrivacyPolicy;