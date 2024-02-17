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

export default function page() {
  return (
    <div className=" border h-[135vh] shadow bg-white">
      <div>
        <h1 className=" px-6 py-3 text-xl font-semibold border-b">Pegawai</h1>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <AiOutlineHome />
          <Link href={"/pegawai/dashboard"}>Dashboard</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <RiAdminLine />
          <Link href={"/pegawai/pegawai"}>Pegawai</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <CiLogout />
          <Link href={""}>Log out</Link>
        </div>
      </div>
    </div>
  );
}
