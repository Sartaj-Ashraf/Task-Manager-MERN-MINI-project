import React from 'react'

const FilterButton = ({active, onClick, children, variant = "default"}) => {
    const variants = {
        default: active ? "bg-slate-800 text-white" : "bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm",
        active: active ? "bg-orange-600 text-white" : "bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm",
        completed: active ? "bg-green-600 text-white" : "bg-white/50 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-sm"
      }
    
      return (
        <button
          onClick={onClick}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${variants[variant]}`}
        >
          {children}
        </button>
      )
    }

export default FilterButton
