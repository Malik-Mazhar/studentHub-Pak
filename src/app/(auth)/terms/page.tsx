import Link from "next/link";

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0b1120] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto w-full max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Last updated: August 28, 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] p-5 sm:p-8 lg:p-10 shadow-sm">

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              1. Acceptance of Terms
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              By accessing or using StudentHub, you agree to follow these
              Terms & Conditions and all applicable laws and regulations.
              If you do not agree with these terms, please do not use
              StudentHub.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              2. Your Account
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              To use certain features of StudentHub, you may need to create
              an account. You are responsible for providing accurate
              information and keeping your account credentials secure.
            </p>

            <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              <li>Provide accurate information when creating your account.</li>
              <li>Keep your password and account credentials secure.</li>
              <li>Be responsible for activity performed through your account.</li>
              <li>Do not share your account with others.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              3. User Content
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              StudentHub allows users to create and share posts, questions,
              polls, notes, images, videos, comments, and other educational
              material. You are responsible for the content you submit.
            </p>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              Content must not violate applicable laws, infringe the rights
              of others, contain harmful or abusive material, promote illegal
              activities, or contain malicious software.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              4. Educational Content
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              StudentHub is designed to help students learn, communicate,
              and share educational resources. User-generated content may
              contain mistakes or inaccurate information, so users should
              verify important information independently.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              5. Questions and Polls
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              Users may create questions and polls on StudentHub. Questions
              and polls must not be used to mislead, harass, target other
              users, spread harmful content, or manipulate the voting system.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              6. Respectful Community
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              StudentHub is intended to provide a safe and useful environment
              for students. Users must not harass, threaten, impersonate, or
              intentionally harm other users.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              7. Prohibited Activities
            </h2>

            <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base text-gray-600 dark:text-gray-300">
              <li>Attempting to access another user's account.</li>
              <li>Interfering with the security or operation of StudentHub.</li>
              <li>Uploading malicious files or code.</li>
              <li>Spamming users or the platform.</li>
              <li>Impersonating another person.</li>
              <li>Using the platform for unlawful purposes.</li>
            </ul>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              8. Account Suspension or Termination
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              StudentHub may suspend or terminate an account if we reasonably
              believe that the user has violated these Terms & Conditions or
              misused the platform.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              9. Changes to These Terms
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              We may update these Terms & Conditions from time to time.
              Continued use of StudentHub after updated terms become effective
              means that you accept the revised Terms & Conditions.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              10. Contact Us
            </h2>

            <p className="text-sm sm:text-base leading-7 text-gray-600 dark:text-gray-300">
              If you have questions or concerns about these Terms &
              Conditions, please contact the StudentHub team through the
              contact method provided on the platform.
            </p>
          </section>

          {/* Bottom */}
          <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By using StudentHub, you acknowledge that you have read,
              understood, and agreed to these Terms & Conditions.
            </p>

            <Link
              href="/sign-up"
              className="mt-4 inline-block text-sm font-semibold text-green-600 dark:text-green-400 hover:underline"
            >
              Back to Sign Up
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
};

export default TermsPage;