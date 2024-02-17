"use client";
import { collectionAbsensiKeluar, collectionAbsensiMasuk } from "@/firebase/config";
import { addDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { BsPersonCheck } from "react-icons/bs";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import { toast } from "sonner";

export default function Page() {
  const {data} = useSession()

  const absenMasuk = async () => {
    const dataAbsenMasuk = {
      ...data.user,
      waktu: Date.now(),
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
    const dataAbsenKeluar = {
      ...data.user,
      waktu: Date.now(),
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
    <div className="grid grid-cols-2 h-[60vh] gap-3 p-4">
      <button  onClick={absenMasuk} className="p-4 rounded font-bold text-white bg-emerald-500 flex justify-center items-center">
        <span>Absen Masuk</span> <BsPersonCheck />
      </button>
      <button  onClick={absensiKeluar} className="p-4 rounded font-bold text-white bg-rose-600 flex justify-center items-center">
        <span>Absen Keluar</span> <IoMdExit />
      </button>
    </div>
  );
}
