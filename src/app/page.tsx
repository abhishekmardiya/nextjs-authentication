export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-white text-gray-900 font-sans p-4">
      <div className="w-full max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black">
          Next.js Authentication
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          A robust, full-stack authentication system built with Next.js,
          MongoDB, JSON Web Tokens (JWT), and Nodemailer.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Secure Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Secure</h3>
            <p className="text-sm text-gray-600">
              Built with industry standards using bcrypt for password hashing
              and JWT for session management.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Database Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Full Stack
            </h3>
            <p className="text-sm text-gray-600">
              Leverages Next.js App Router and Server Actions for a seamless
              full-stack developer experience.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Email Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Email Verification
            </h3>
            <p className="text-sm text-gray-600">
              Includes Nodemailer integration for verifying user emails and
              handling password resets securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
