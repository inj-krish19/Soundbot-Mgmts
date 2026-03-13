import React from "react";

function TermsConditions() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Terms and Conditions
                </h1>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Welcome to our platform. By accessing or using our services,
                    you agree to comply with the following Terms and Conditions.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    1. Acceptance of Terms
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    By creating an account or using our services, you confirm
                    that you accept these terms and agree to follow them.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    2. User Responsibilities
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    Users agree to:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>Provide accurate account information.</li>
                    <li>Maintain the security of their login credentials.</li>
                    <li>Use the platform in a lawful and respectful manner.</li>
                    <li>Avoid any activity that may harm the system or other users.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    3. Prohibited Activities
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    Users must not:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>Attempt unauthorized access to the system.</li>
                    <li>Distribute malicious software or harmful content.</li>
                    <li>Misuse platform features or services.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    4. Service Availability
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    We strive to maintain uninterrupted service but cannot
                    guarantee that the platform will always be available
                    without interruptions due to maintenance or technical issues.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    5. Changes to the Terms
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    We reserve the right to update or modify these Terms and
                    Conditions at any time. Continued use of the platform after
                    changes indicates acceptance of the updated terms.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    6. Limitation of Liability
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    We are not responsible for any direct or indirect damages
                    arising from the use or inability to use our services.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    7. Contact
                </h2>

                <p className="text-sm sm:text-base leading-relaxed">
                    If you have questions about these Terms and Conditions,
                    please contact us through the <strong>Contact or Support page</strong>.
                </p>

            </div>
        </div>
    );
}

export default TermsConditions;