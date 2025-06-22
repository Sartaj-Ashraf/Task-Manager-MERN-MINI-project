import { Search } from "lucide-react";
import React from "react";
import FilterButton from "./FilterButton";

const SearchAndFilter = ({ searchTerm, onSearchChange, filter, onFilterChange }) => {
  return (
    <div className="mb-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-lg border border-slate-200/50 dark:border-slate-700/50">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 px-3 py-2 bg-white/50 dark:bg-slate-700/50 border-0 rounded-md focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="flex gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => onFilterChange("all")}
            >
              All
            </FilterButton>
            <FilterButton
              active={filter === "active"}
              onClick={() => onFilterChange("active")}
              variant="active"
            >
              Active
            </FilterButton>
            <FilterButton
              active={filter === "completed"}
              onClick={() => onFilterChange("completed")}
              variant="completed"
            >
              Completed
            </FilterButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
