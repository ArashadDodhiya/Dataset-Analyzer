import { useState } from 'react';
import { analyzeDataset } from '../api/datasetService';
import DatasetUpload from '../components/DatasetUpload';
import ResultsDisplay from '../components/ResultsDisplay';

export default function SimpleAnalysisPage() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const analysisResults = await analyzeDataset(file);

      setResults({
        fileInfo: {
          filename: analysisResults.file_info?.filename || 'N/A',
          size: (file.size / 1024).toFixed(2) + ' KB',
          extension: analysisResults.file_info?.extension || 'N/A',
        },
        stats: analysisResults.statistics,
        rowCount: analysisResults.file_info?.row_count || 'N/A',
        columnCount: analysisResults.file_info?.column_count || 'N/A',
        missingValues: analysisResults.eda?.missing_values || {},
        visualizations: analysisResults.visualizations || {},
        mlSuggestions: analysisResults.ml_suggestions || {},
        fullResponse: analysisResults,
      });
    } catch (err) {
      setError(err.message || 'Failed to analyze dataset');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <header className="text-center">
          <div className="inline-block bg-white/50 p-2 rounded-full backdrop-blur-sm mb-4 shadow-sm">
            <div className="bg-indigo-600 text-white p-3 rounded-full text-2xl">
              📊
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Dataset Analyzer
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload your CSV file to receive comprehensive statistical analysis, visualizations, and machine learning recommendations.
          </p>
        </header>

        {/* Upload Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
          <DatasetUpload onUpload={handleUpload} isLoading={isLoading} />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
            <div className="flex justify-center items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-indigo-600 font-medium">Analyzing your dataset...</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">This may take a moment depending on the file size</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50/80 p-6 rounded-2xl border border-red-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Analysis Error</h3>
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="mt-3 px-4 py-1.5 text-sm bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {results && <ResultsDisplay results={results} />}

        {/* Debug Information */}
        {results?.fullResponse && (
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer list-none">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-open:bg-indigo-100 group-open:text-indigo-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-800 group-open:text-indigo-700">Raw API Response (Debug View)</span>
              </summary>
              <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
                <pre className="text-xs text-gray-700">
                  {JSON.stringify(results.fullResponse, null, 2)}
                </pre>
              </div>
            </details>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 border-t border-gray-200 mt-12">
          <p>Analysis completed with ❤️ using our advanced analytics engine</p>
          <p className="mt-1">{new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}</p>
        </footer>
      </div>
    </div>
  );
}