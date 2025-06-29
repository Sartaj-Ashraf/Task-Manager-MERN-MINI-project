import React from 'react'

const ErrorMessage = ({error}) => {
  return (
    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
    <div className="p-4">
      <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
    </div>
  </div>
  )
}

export default ErrorMessage
