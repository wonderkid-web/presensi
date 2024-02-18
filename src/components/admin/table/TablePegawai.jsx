"use client";

import { IoIosFemale, IoIosMale } from "react-icons/io";
import { Toaster, toast } from "sonner";
import useRealtime from "@/hooks/useRealtime";
import { collectionPegawai, store } from "@/firebase/config";
import uuid from "react-uuid";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import { deleteData } from "@/utils";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { SheetIcon } from "lucide-react";
import { useRef } from "react";

export default function TablePegawai() {
  const { data } = useRealtime(collectionPegawai);
  const tableRef = useRef(null)

  const deletePegawai = async (user) => {
    try {
      const pegawaiDocRef = doc(store, "pegawai", user.id);
      await deleteData(pegawaiDocRef, "Pegawai");
    } catch (error) {
      toast.error(error.message);
      toast.error("Gagal Menghapus User");
    }
  };

  if (data)
    return (
      <div className="flex flex-col bg-white">
        <div className="m-2">
          <DownloadTableExcel
            filename="users table"
            sheet="users"
            currentTableRef={tableRef.current}
          >
            <button className="p-1 rounded text-sm text-white bg-emerald-600 flex items-center gap-2">
              <span> Export excel | </span>
              <SheetIcon />
            </button>
          </DownloadTableExcel>
        </div>

        <table ref={tableRef} className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead>
            <tr>
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
                Alamat
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Agama
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
                NIP
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Nomor Handphone / Whatsapp
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Tempat Tanggal Lahir
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.alamat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.agama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex gap-2 items-center justify-center">
                    {item.jenis_kelamin == "l" ? "laki-laki" : "perempuan"}
                    {item.jenis_kelamin == "l" ? (
                      <IoIosFemale />
                    ) : (
                      <IoIosMale />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.nip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item?.no_hp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.pob}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button
                      onClick={() => deletePegawai(item)}
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
                    Data Pegawai Kosong
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}
