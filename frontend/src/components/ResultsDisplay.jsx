// import { toPng } from 'html-to-image';
// import jsPDF from 'jspdf';

export default function ResultsDisplay({ results }) {
  const handleExport = () => {
    // Create a blob from the results data
    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json",
    });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dataset-analysis-report-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    // Trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8 rounded-2xl space-y-10">
      {/* Hero Section */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-block bg-indigo-100/50 p-3 rounded-full backdrop-blur-sm">
          <div className="bg-indigo-600 text-white p-4 rounded-full text-3xl">
            📊
          </div>
        </div>
        <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Data Analysis Report
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive insights and actionable recommendations from your
          dataset
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* File Info */}
        <div className="animate-fade-in bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-indigo-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              File Information
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium">Filename</span>
              <span className="text-gray-800">{results.fileInfo.filename}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium">Size</span>
              <span className="text-gray-800">{results.fileInfo.size}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Extension</span>
              <span className="text-gray-800">
                {results.fileInfo.extension}
              </span>
            </div>
          </div>
        </div>

        {/* Dataset Shape */}
        <div className="animate-fade-in bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-indigo-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Dataset Overview
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium">Rows</span>
              <span className="text-gray-800">{results.rowCount}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium">Columns</span>
              <span className="text-gray-800">{results.columnCount}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Missing Values</span>
              <span className="text-gray-800">
                {Object.keys(results.missingValues).length} columns
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="animate-fade-in bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-indigo-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg text-green-600 group-hover:bg-green-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Key Statistics
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            {results.stats &&
              Object.entries(results.stats)
                .slice(0, 3)
                .map(([columnName, stats]) => (
                  <div
                    key={columnName}
                    className="py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="font-medium text-gray-800 truncate">
                      {columnName}
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>Mean: {stats.mean?.toFixed(2) || "N/A"}</span>
                      <span>Max: {stats.max?.toFixed(2) || "N/A"}</span>
                      <span>Min: {stats.min?.toFixed(2) || "N/A"}</span>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Detailed Statistics
          </h3>
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Column
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mean
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Median
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Min
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Max
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Std Dev
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.stats &&
                Object.entries(results.stats).map(([columnName, stats]) => (
                  <tr
                    key={columnName}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {columnName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.mean?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.median?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.min?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.max?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.std?.toFixed(2) || "N/A"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visualizations */}
      {results.visualizations && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Data Visualizations
            </h3>
            <p className="mt-2 text-gray-600">
              Key insights visualized for better understanding
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(results.visualizations).map(([name, base64]) => (
              <div
                key={name}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <h4 className="font-medium capitalize">
                    {name.replace(/_/g, " ")}
                  </h4>
                </div>
                <img
                  src={`data:image/png;base64,${base64}`}
                  alt={name}
                  className="rounded-lg w-full h-auto border border-gray-200 hover:border-indigo-300 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ML Suggestions */}
      {results.mlSuggestions && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Machine Learning Recommendations
            </h3>
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature Engineering */}
            {results.mlSuggestions.feature_engineering?.length > 0 && (
              <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-indigo-800">
                    Feature Engineering
                  </h4>
                </div>
                <ul className="space-y-3">
                  {results.mlSuggestions.feature_engineering.map(
                    (item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span className="mt-0.5 flex-shrink-0 text-indigo-500">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Possible Problems */}
            {results.mlSuggestions.possible_problems?.length > 0 && (
              <div className="bg-red-50/50 p-5 rounded-xl border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-red-800">
                    Potential Issues
                  </h4>
                </div>
                <ul className="space-y-3">
                  {results.mlSuggestions.possible_problems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-0.5 flex-shrink-0 text-red-500">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Suggestions */}
            {results.mlSuggestions.target_suggestions?.length > 0 && (
              <div className="bg-green-50/50 p-5 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-green-800">
                    Target Suggestions
                  </h4>
                </div>
                <ul className="space-y-3">
                  {results.mlSuggestions.target_suggestions.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="mt-0.5 flex-shrink-0 text-green-500">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          Analysis completed at {new Date().toLocaleString()}
        </p>
        <button
          onClick={handleExport}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
          disabled={!results} // Disable if no results
        >
          Export Full Report
        </button>
      </div>
    </div>
  );
}
