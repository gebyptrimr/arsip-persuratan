import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F0F4F8" }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />
      <div style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? "72px" : "240px",
        transition: "margin-left 0.25s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
        />
      <main
  style={{
    marginTop: "68px",
    padding: 0,
    flex: 1,
  }}
>
  <Outlet />
</main>
      </div>
    </div>
  );
}