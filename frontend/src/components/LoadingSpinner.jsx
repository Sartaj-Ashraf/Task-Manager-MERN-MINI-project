import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        Loading tasks...
      </p>
    </div>
  );
};

export default LoadingSpinner;
