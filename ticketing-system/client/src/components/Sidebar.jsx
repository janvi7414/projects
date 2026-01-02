import React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

export default function Sidebar({ onFilterChange }) {
  // Sidebar collapsed state
  const [isCollapsed, setIsCollapsed] = useState(false)
  // Active priority filter
  const [activePriority, setActivePriority] = useState(null)

  // Priority filters with colors
  const priorities = [
    { name: "All Tickets", value: null, color: "bg-gray-500" },
    { name: "Low Priority", value: "low", color: "bg-green-500" },
    { name: "Medium Priority", value: "medium", color: "bg-yellow-500" },
    { name: "High Priority", value: "high", color: "bg-red-500" },
  ]

  const handlePriorityClick = (priority) => {
    setActivePriority(priority)
    if (onFilterChange) {
      onFilterChange(priority)
    }
  }

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r border-border transition-all duration-300 z-40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse/Expand Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-6 bg-background border border-border rounded-full p-1 hover:bg-accent transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-foreground" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-foreground" />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="p-4 space-y-6 overflow-y-auto h-full">
        {/* Filter Header */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-foreground" />
          {!isCollapsed && <h2 className="text-lg font-semibold text-foreground">Filters</h2>}
        </div>

        {/* Priority Filters */}
        <div className="space-y-2">
          {!isCollapsed && <h3 className="text-sm font-medium text-muted-foreground mb-3">Priority</h3>}
          {priorities.map((priority) => (
            <button
              key={priority.value || "all"}
              onClick={() => handlePriorityClick(priority.value)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activePriority === priority.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-accent text-foreground"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              {/* Priority Color Dot */}
              <span className={`h-3 w-3 rounded-full ${priority.color} shrink-0`} />
              {/* Priority Label */}
              {!isCollapsed && <span className="text-sm font-medium">{priority.name}</span>}
            </button>
          ))}
        </div>

        {/* Additional Filter Section (Optional) */}
        {!isCollapsed && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Status</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                <input type="checkbox" className="rounded border-border" />
                <span>Open</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                <input type="checkbox" className="rounded border-border" />
                <span>In Progress</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                <input type="checkbox" className="rounded border-border" />
                <span>Closed</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
