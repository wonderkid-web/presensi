"use client";

import React, { useState } from "react";
import Link from "next/link";

// icons
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { FaUsersViewfinder } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { FaRegListAlt } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoNewspaperOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { signout } from "@/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  const { data: session } = useSession();
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);

  return (
    <div className=" border shadow bg-white">
      <div>
        <div className="px-2 py-3 border-b flex flex-col relative">
          <p className="text-slate-700 text-[0.90rem] font-semibold">
            Selamat Datang
          </p>
          <p className="text-slate-600 text-xs">{session?.user?.nama}</p>
          <div className=" col-start-2 h-11  w-11 rounded-full overflow-hidden absolute right-2 mx-auto">
            <Image
              className="object-cover"
              src={session?.user?.profile}
              alt="Alternatif Musuh"
              fill
              sizes="100vw"
            />
          </div>
       
        </div>

        {/* <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <RiAdminLine />
          <Link href={"/admin"}>Admin</Link>
        </div> */}
        <Link href={"/admin/beranda"} className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <AiOutlineHome />
          <span>Beranda</span>
        </Link>
        <Link href={"/admin/data-pegawai"} className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <HiOutlineUserGroup />
          <span>Data pegawai</span>
        </Link>
        <Link href={"/admin/data-user"} className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <LuUser2 />
          <span>Data user</span>
        </Link>
        <Link href={"/admin/data-jabatan"} className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <FaUsersViewfinder />
          <span>Data jabatan</span>
        </Link>
        <Link href={"/admin/data-absen"} className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <LuClipboardList />
          <span>Data absen</span>
        </Link>
        <Link href={"/admin/data-keterangan"} className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <FaRegListAlt />
          <span>Data keterangan</span>
        </Link>
        
        {/* Laporan Dropdown */}
        <div
          className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 "
          onClick={() => setIsLaporanOpen(!isLaporanOpen)}
        >
          <IoNewspaperOutline />
          <span>Laporan</span>
          {isLaporanOpen ? <IoChevronUp /> : <IoChevronDown />}
        </div>
        {isLaporanOpen && (
          <div className="pl-10">
            <Link href="/admin/laporan/harian" className="px-6 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
              <span>- Harian</span>
            </Link>
            <Link href="/admin/laporan/mingguan" className="px-6 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
              <span>- Mingguan</span>
            </Link>
            <Link href="/admin/laporan/bulanan" className="px-6 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
              <span>- Bulanan</span>
            </Link>
            <Link href="/admin/laporan/tahunan" className="px-6 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2">
              <span>- Tahunan</span>
            </Link>
          </div>
        )}

        <button
          onClick={signout}
          className="px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 w-full text-left"
        >
          <CiLogout />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
