"use client"

import React from "react";
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
import { signout } from "@/utils";


export default function page() {
  return (
    <div className=" border shadow bg-white">
      <div>
      <h1 className=" px-6 py-3 text-xl font-semibold border-b">Admin</h1>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <RiAdminLine />
          <Link href={"/admin"}>Admin</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <AiOutlineHome />
          <Link href={"/admin/beranda"}>Beranda</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <HiOutlineUserGroup />
          <Link href={"/admin/data-pegawai"}>Data pegawai</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <LuUser2 />
          <Link href={"/admin/data-user"}>Data user</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <FaUsersViewfinder />
          <Link href={"/admin/data-jabatan"}>Data jabatan</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <LuClipboardList />
          <Link href={"/admin/data-absen"}>Data absen</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <FaRegListAlt />
          <Link href={"/admin/data-keterangan"}>Data keterangan</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <CiLogout />
          <span onClick={signout}>Log out</span>
        </div>
      </div>
    </div>
  );
}
