import React from "react";

function RefundPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Refund Policy
                </h1>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    Thank you for using our platform. We strive to provide
                    high-quality services and ensure user satisfaction.
                    This Refund Policy outlines the conditions under which
                    refunds may be issued.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    1. Eligibility for Refund
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    Refunds may be granted under the following circumstances:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>If a technical issue on our platform prevents access to a purchased service.</li>
                    <li>If a payment was made accidentally or duplicated.</li>
                    <li>If the service purchased was not delivered as described.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    2. Non-Refundable Cases
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    Refunds will generally <strong>not be provided</strong> in the following situations:
                </p>

                <ul className="list-disc ml-6 space-y-2 text-sm sm:text-base">
                    <li>Change of mind after purchase.</li>
                    <li>Partial use of the service or subscription.</li>
                    <li>Violations of our Terms and Conditions.</li>
                </ul>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    3. Refund Request Process
                </h2>

                <p className="mb-3 text-sm sm:text-base leading-relaxed">
                    To request a refund:
                </p>

                <ol className="list-decimal ml-6 space-y-2 text-sm sm:text-base">
                    <li>Contact our support team within <strong>7 days of the transaction</strong>.</li>
                    <li>Provide your <strong>transaction ID</strong>, <strong>account details</strong>, and reason for the request.</li>
                    <li>Our team will review the request and respond within <strong>3–5 business days</strong>.</li>
                </ol>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    4. Processing Time
                </h2>

                <p className="mb-4 text-sm sm:text-base leading-relaxed">
                    If approved, refunds will be processed through the
                    <strong> original payment method</strong>. It may take
                    <strong> 5–10 business days</strong> depending on the
                    payment provider.
                </p>

                <h2 className="text-lg sm:text-xl font-semibold mt-8 mb-2">
                    5. Contact Support
                </h2>

                <p className="text-sm sm:text-base leading-relaxed">
                    If you have questions about refunds, please contact our
                    support team through the <strong>Support or Contact Us page</strong>.
                </p>

            </div>
        </div>
    );
}

export default RefundPolicy;