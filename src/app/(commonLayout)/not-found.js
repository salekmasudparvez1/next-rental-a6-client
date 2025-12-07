const Page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="text-center px-6">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    404
                </h1>
                <h2 className="text-4xl font-bold text-white mt-4">Page Not Found</h2>
                <p className="text-lg text-gray-300 mt-4 mb-8">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
}

export default Page;
