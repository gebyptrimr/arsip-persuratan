import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);


  const sidebarWidth = sidebarCollapsed ? 72 : 280;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F8FC",
      }}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      {/* CONTENT */}
      <div
        style={{
          marginLeft: sidebarWidth,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "all .3s ease",
          minHeight: "100vh",
        }}
      >
        <Navbar sidebarCollapsed={sidebarCollapsed} />

      <main
        style={{
          padding: "0 10px", // atas kanan bawah kiri
          flex: 1,
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
          <Outlet />
        </main>
      </div>
    </div>
  );
}