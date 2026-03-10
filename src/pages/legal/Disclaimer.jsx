import React from "react";

function Disclaimer() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Disclaimer
                </h1>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    The information provided by <strong>Soundbot Mgmts</strong> is intended
                    for general informational and analytical purposes. By using this
                    application, you acknowledge and agree to the terms described in
                    this disclaimer.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    1. General Information
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Soundbot Mgmts provides tools for session tracking, usage monitoring,
                    analytics visualization, and activity insights. While we aim to
                    provide accurate and reliable data analysis, the application should
                    not be considered a guaranteed measurement or official record of
                    usage activity.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    2. No Professional Advice
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    The analytics and insights generated within the platform are for
                    informational purposes only. They should not be interpreted as
                    professional, financial, or operational advice.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    3. Accuracy of Data
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    While reasonable efforts are made to ensure the accuracy of
                    information and statistics presented in the dashboard, discrepancies
                    may occur due to technical limitations, connectivity issues, or data
                    processing delays.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    4. Limitation of Liability
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Soundbot Mgmts shall not be held responsible for any loss, damages,
                    or disruptions resulting from the use of the application, including
                    but not limited to data inaccuracies, service interruptions, or
                    unexpected system behavior.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    5. External Services
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Certain features such as authentication providers or integrations
                    may rely on third-party services. Soundbot Mgmts is not responsible
                    for the availability, performance, or policies of these external
                    services.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    6. Updates to This Disclaimer
                </h2>

                <p className="text-sm sm:text-base leading-relaxed">
                    This disclaimer may be updated periodically to reflect changes in
                    the application, legal requirements, or operational policies.
                    Updated versions will be published within the application.
                </p>

            </div>
        </div>
    );
}

export default Disclaimer;