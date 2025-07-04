import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900">
      <header className="container mx-auto px-6 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-3xl font-bold text-white">DataAnalyzer</div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg bg-white text-indigo-800 font-medium hover:bg-gray-100 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-lg border-2 border-white text-white font-medium hover:bg-white hover:text-indigo-800 transition duration-300"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold mb-6 text-white leading-tight">
          Transform Your Data <br />Into Powerful Insights
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-blue-100">
          Upload your CSV or Excel files and get instant statistical analysis, 
          beautiful visualizations, and actionable insights.
        </p>
        <div className="space-x-4">
          <Link
            to="/analysis"
            className="inline-block bg-white text-indigo-800 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Start Analyzing
          </Link>
          <Link
            to="/demo"
            className="inline-block border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-indigo-800 transition duration-300"
          >
            Live Demo
          </Link>
        </div>
        
        <div className="mt-20">
          <div className="inline-block bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <p className="text-blue-100 mb-2">Trusted by data teams at</p>
            <div className="flex justify-center space-x-8 items-center">
              <span className="text-white font-medium">Acme Inc</span>
              <span className="text-white font-medium">DataCorp</span>
              <span className="text-white font-medium">AnalyticsCo</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}