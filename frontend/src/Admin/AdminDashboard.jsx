import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#eee" }}>
        <h3>Admin Menu</h3>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <Outlet /> 
      </div>

    </div>
  )
}