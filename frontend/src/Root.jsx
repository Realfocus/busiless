import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
