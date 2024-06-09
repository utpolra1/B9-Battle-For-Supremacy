import React from 'react';

const ErrorElement = ({ error, errorInfo }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-700 p-6">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-4">
        We are sorry for the inconvenience. Please try again later.
      </p>
      {error && errorInfo && (
        <details className="bg-white p-4 border border-gray-300 rounded w-full max-w-2xl text-left whitespace-pre-wrap">
          {error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      )}
    </div>
  );
};

export default ErrorElement;
