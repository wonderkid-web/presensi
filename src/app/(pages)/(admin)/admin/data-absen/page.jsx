"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableAbsensi from "@/components/admin/table/TableAbsen";
import { toast } from "sonner";
import { addDoc } from "firebase/firestore";
import { collectionAbsensiKeluar, collectionAbsensiMasuk } from "@/firebase/config";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();

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
    <div className="p-8">
      <Tabs defaultValue="masuk" className="max-w-[90vw]">
        <TabsList className="mx-auto">
          <TabsTrigger value="masuk">Absen Masuk</TabsTrigger>
          <TabsTrigger value="keluar">Absen Keluar</TabsTrigger>
        </TabsList>
        <TabsContent value="masuk">
          <TableAbsensi
            collection={collectionAbsensiMasuk}
            type={"Masuk"}
            nama_collection_ref={"absensi_masuk"}
          />
        </TabsContent>
        <TabsContent value="keluar">
          <TableAbsensi
            collection={collectionAbsensiKeluar}
            type={"Keluar"}
            nama_collection_ref={"absensi_keluar"}
          />
        </TabsContent>
      </Tabs>

      <button onClick={absenMasuk}>masuk</button>
      <button onClick={absensiKeluar}>keluar</button>
    </div>
  );
}
