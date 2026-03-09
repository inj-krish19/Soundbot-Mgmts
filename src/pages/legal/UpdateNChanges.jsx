import React from 'react'

function UpdateNChanges() {

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Updates & Changes
                </h1>

                <p className="mb-6 text-sm sm:text-base leading-relaxed">
                    This page highlights major updates, feature improvements, and
                    system enhancements introduced in <strong>Soundbot Mgmts</strong>.
                    We continuously improve the platform to provide better performance,
                    analytics capabilities, and user experience.
                </p>

                <div className="space-y-6">

                    <div>
                        <h2 className="font-semibold text-lg sm:text-xl">
                            Latest Update
                        </h2>

                        <ul className="list-disc ml-6 mt-2 space-y-2 text-sm sm:text-base">
                            <li>
                                Added highlighted statistics within the dashboard including
                                session summaries, charging insights, and key usage indicators.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg sm:text-xl">
                            Previous Update
                        </h2>

                        <ul className="list-disc ml-6 mt-2 space-y-2 text-sm sm:text-base">
                            <li>
                                Enabled mobile-friendly layout and responsive design.
                            </li>
                            <li>
                                Introduced visualization charts for analytics such as usage
                                trends, session distribution, and activity insights.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg sm:text-xl">
                            Earlier Update
                        </h2>

                        <ul className="list-disc ml-6 mt-2 space-y-2 text-sm sm:text-base">
                            <li>
                                Added OAuth authentication support including Google and
                                Facebook login.
                            </li>
                            <li>
                                Introduced theme mode support allowing users to switch
                                between light and dark themes.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg sm:text-xl">
                            Feature Enhancement
                        </h2>

                        <ul className="list-disc ml-6 mt-2 space-y-2 text-sm sm:text-base">
                            <li>
                                Improved dashboard performance and session data processing.
                            </li>
                            <li>
                                Optimized database queries for faster analytics generation.
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg sm:text-xl">
                            Initial Release
                        </h2>

                        <ul className="list-disc ml-6 mt-2 space-y-2 text-sm sm:text-base">
                            <li>
                                Core platform launch including session tracking, charging
                                management, and user dashboard.
                            </li>
                            <li>
                                Implementation of analytics system and foundational data
                                infrastructure.
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default UpdateNChanges;