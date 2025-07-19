"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableAbsensi from "@/components/admin/table/TableAbsen";
import { collectionAbsensiKeluar, collectionAbsensiMasuk } from "@/firebase/config";

export default function Page() {
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

    </div>
  );
}
