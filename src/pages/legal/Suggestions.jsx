import React from 'react'

function Suggestions() {

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Suggestions & Feedback
                </h1>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    We value feedback from our users. Your suggestions help us improve the
                    platform and provide better services. Every idea, report, or
                    recommendation contributes to making the platform more useful and
                    reliable for everyone.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    Why Your Feedback Matters
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    Your suggestions help us:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>Improve platform performance and stability.</li>
                    <li>Add useful features requested by users.</li>
                    <li>Fix usability issues and bugs.</li>
                    <li>Enhance the overall user experience.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    How to Submit a Suggestion
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    You can share your suggestions or feedback using any of the following methods:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>Filling out the <strong>Suggestion Form</strong> available in the platform.</li>
                    <li>Contacting our <strong>support team</strong> through the help section.</li>
                    <li>Emailing us with your feedback and ideas.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    What to Include in Your Suggestion
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    For the best results, please include the following details when submitting feedback:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>A clear description of your idea or suggestion.</li>
                    <li>The problem or limitation you encountered.</li>
                    <li>How the improvement would help other users.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    Our Commitment
                </h2>

                <p className="text-sm sm:text-base leading-relaxed">
                    We review all feedback carefully and consider suggestions for future
                    updates and improvements. While not every request can be implemented
                    immediately, user feedback plays an important role in shaping the
                    direction of the platform.
                </p>

                <p className="mt-4 text-sm sm:text-base leading-relaxed">
                    Thank you for helping us make our platform better.
                </p>

            </div>
        </div>
    );

}

export default Suggestions;