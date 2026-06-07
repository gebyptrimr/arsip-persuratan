import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
}

export default MainLayout;