import { Inter } from "next/font/google";
import "./globals.css";
// Your App.tsx file
import 'react-day-picker/dist/style.css';
import AuthProvider from "@/auth/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aplikasi Presensi",
  description: "| Presensi Pegawai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
