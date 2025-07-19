"use client";
import { collectionAbsensiKeluar, collectionAbsensiMasuk } from "@/firebase/config";
import { addDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { BsPersonCheck } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { toast } from "sonner";

export default function Page() {
  const {data} = useSession()

  const absenMasuk = async () => {
    const waktuMasuk = new Date()
    const dataAbsenMasuk = {
      ...data.user,
      waktu: waktuMasuk,
    };
    toast.promise(addDoc(collectionAbsensiMasuk, dataAbsenMasuk), {
      loading: "Proses Menambahkan Absen Masuk",
      success: () => {
        return `Absensi Masuk berhasil dibuat`;
      },
      error: () => {
        return `Data Absensi Masuk Gagal Dibuat`;
      },
    });
  };
  const absensiKeluar = async () => {
    const waktuKeluar = new Date()
    const dataAbsenKeluar = {
      ...data.user,
      waktu: waktuKeluar,
    };
    toast.promise(addDoc(collectionAbsensiKeluar, dataAbsenKeluar), {
      loading: "Proses Menambahkan Absen Keluar",
      success: () => {
        return `Absensi Keluar berhasil dibuat`;
      },
      error: () => {
        return `Data Absensi Keluar Gagal Dibuat`;
      },
    });
  };

  return (
    <div className="flex h-screen flex-col gap-3 p-4">
      <button  onClick={absenMasuk} className="p-4 text-[3.5rem] h-[50%] rounded font-bold text-white bg-emerald-500 flex justify-center items-center">
        <span>Absen Masuk</span> <BsPersonCheck />
      </button>
      <button  onClick={absensiKeluar} className="p-4 text-[3.5rem] rounded h-[50%] font-bold text-white bg-rose-600 flex justify-center items-center">
        <span>Absen Keluar</span> <IoMdExit />
      </button>
    </div>
  );
}
