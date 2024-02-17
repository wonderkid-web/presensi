"use client";
import { useState } from "react";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useRealtime from "@/hooks/useRealtime";
import { collectionJabatan, store } from "@/firebase/config";
import uuid from "react-uuid";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { Toaster, toast } from "sonner";

export default function Page() {
  const { data } = useRealtime(collectionJabatan);

  const { handleSubmit, register, reset } = useForm();

  const submitJabatan = ({ jabatan }) => {
    toast.promise(addDoc(collectionJabatan, { jabatan }), {
      loading: "Proses Menambahkan Jabatan Baru",
      success: (data) => {
        reset();
        return `Data Jabatan dengan ID:${data.id} berhasil dibuat`;
      },
      error: () => {
        reset();
        return `Data Jabatan Gagal Dibuat`;
      },
    });
  };

  const deleteJabatan = (id) => {
    const jabatanDocRef = doc(store, "jabatan", id);
    toast.promise(deleteDoc(jabatanDocRef), {
      loading: "Proses Menghapus Jabatan Baru",
      success: () => {
        return `Data Jabatan dengan ID:${id} berhasil dihapus`;
      },
      error: () => {
        return `Data Jabatan dengan ID:${id} berhasil dihapus`;
      },
    });
  };

  return (
    <div className="p-8">
      <h1 className=" text-2xl font-semibold">Data jabatan</h1>
      <div className="mt-6">
        <form
          onSubmit={handleSubmit(submitJabatan)}
          className=" flex gap-4 w-full"
        >
          <Input
            type="text"
            placeholder="masukan jabatan anda"
            {...register("jabatan")}
            className="focus:border-"
          />
          <Button type="submit" className="bg-blue-500">
            Simpan
          </Button>
        </form>
      </div>

      <table className="w-full mt-6 bg-white">
        <thead>
          <tr className="border">
            <th className=" p-2">No</th>
            <th className=" p-2">Jabatan</th>
            <th className=" p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => (
            <tr key={uuid()} className=" border text-center">
              <td className=" p-2">{i + 1}</td>
              <td className=" p-2">{item.jabatan}</td>
              <td className="flex items-center justify-center p-2">
                <Button
                  variant="destructive"
                  onClick={() => deleteJabatan(item.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
