"use client";
import React from "react";
import Link from "next/link";

// icons
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactMail } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { signout } from "@/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Page() {
  const {data:session} = useSession()

  return (
    <div className=" border h-[135vh] shadow bg-white">
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
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <AiOutlineHome />
          <Link href={"/pegawai/dashboard"}>Dashboard</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <RiAdminLine />
          <Link href={"/pegawai/pegawai"}>Pegawai</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <MdOutlineContactMail />
          <Link href={"/pegawai/izin"}>Izin</Link>
        </div>
        <div className=" px-6 py-4 cursor-pointer hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2 ">
          <CiLogout />
          <span onClick={signout}>Log out</span>
        </div>
      </div>
    </div>
  );
}
