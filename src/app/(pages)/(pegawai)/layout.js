import "../../globals.css";
import Sidebar from "../../../components/sidebar/sidebar-pegawai/page";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pegawai",
  description: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Toaster richColors/>
      <div className=" grid grid-cols-[20%_1fr] bg-slate-50">
        <Sidebar />
        <div>{children}</div>
      </div>
    </>
  );
}
