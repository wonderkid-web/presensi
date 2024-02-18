import "../../globals.css";
import Sidebar from "../../../components/sidebar/sidebar-admin/page";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin",
  description: "Dashboard Admin",
};

export default function RootLayout({ children }) {
  return (
    <>
    <Toaster richColors/>
      <div className=" grid grid-cols-[20%_1fr] bg-slate-50">
        <Sidebar />
        <div className="min-h-screen">{children}</div>
      </div>
    </>
  );
}
