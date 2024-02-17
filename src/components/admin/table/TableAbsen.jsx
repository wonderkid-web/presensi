"use client";

import { IoIosFemale, IoIosMale } from "react-icons/io";
import {  toast } from "sonner";
import useRealtime from "@/hooks/useRealtime";
import { store } from "@/firebase/config";
import uuid from "react-uuid";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { deleteData } from "@/utils";
import { format } from "date-fns";
import { id } from 'date-fns/locale/id';


export default function TableAbsensi({collection, type, nama_collection_ref}) {
  const { data } = useRealtime(collection);

  const deleteAbsen = async (user) => {
    try {
      const pegawaiDocRef = doc(store, nama_collection_ref, user.id);
      await deleteData(pegawaiDocRef, type);
    } catch (error) {
      toast.error(error.message);
      toast.error("Gagal Menghapus User");
    }
  };

  const formattedDate = (waktu)=> format(waktu, 'EEEE, dd MMMM yyyy HH:mm', { locale: id });



  if (data)
    return (
      <table className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              NIP
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Nama Lengkap
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Foto Profile
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Jenis Kelamin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Waktu
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Nomor Handphone / Whatsapp
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length ? (
            data?.map((item, i) => (
              <tr key={uuid()} className="text-slate-600 border text-center">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.nip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                  {item.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                  <div className="h-11 w-11 rounded-full overflow-hidden relative mx-auto">
                    <Image
                      className="object-cover"
                      src={item.profile}
                      alt="Alternatif Musuh"
                      fill
                      sizes="100vw"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex gap-2 items-center justify-center">
                  {item.jenis_kelamin == "l" ? "laki-laki" : "perempuan"}
                  {item.jenis_kelamin == "l" ? <IoIosFemale /> : <IoIosMale />}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formattedDate(item.waktu)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item?.no_hp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <button
                    onClick={() => deleteAbsen(item)}
                    type="button"
                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>
                <p className="text-xl text-center text-slate-700 py-4">
                  Data Absen Kosong
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
}
