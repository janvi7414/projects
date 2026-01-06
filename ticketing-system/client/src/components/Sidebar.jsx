import React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

export default function Sidebar({ onFilterChange }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
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
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-6 bg-background border border-border rounded-full p-1 hover:bg-accent transition-colors group"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-foreground" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-foreground" />
        )}
        <span className="  absolute left-full ml -2 top-1/2 - translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-foreground text-background text-xs px-2 py-1 rounded transition-opacity pointer-events-none">
          {isCollapsed? "Expand sidebar" : "Collapse sidebar"}
        </span>
      </button>

      <div className="p-4 space-y-6 overflow-y-auto h-full">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-foreground" />
          {!isCollapsed && <h2 className="text-lg font-semibold text-foreground">Filters</h2>}
        </div>


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

              <span className={`h-3 w-3 rounded-full ${priority.color} shrink-0`} />

              {!isCollapsed && <span className="text-sm font-medium">{priority.name}</span>}
            </button>
          ))}
        </div>


        {!isCollapsed && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Status</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors ">
                <input type="checkbox" className="rounded border-border" />
                <span group-hover:text-primary >Open</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors ">
                <input type="checkbox" className="rounded border-border" />
                <span>In Progress</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors ">
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
