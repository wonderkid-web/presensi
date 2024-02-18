"use client";

import { IoIosFemale, IoIosMale } from "react-icons/io";
import { toast } from "sonner";
import useRealtime from "@/hooks/useRealtime";
import { collectionAdmin, collectionIzin, store } from "@/firebase/config";
import uuid from "react-uuid";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { deleteData, formattedDateIzin, updateStatus } from "@/utils";

export default function TableIzin() {
  const { data } = useRealtime(collectionIzin);

  const deleteIzin = async (user) => {
    try {
      const izinDocRef = doc(store, "izin", user.id);
      await deleteData(izinDocRef, "Izin");
    } catch (error) {
      toast.error(error.message);
      toast.error("Gagal Menghapus Izin");
    }
  };
  const aprove = async (user) => {
    try {
      const izinDocRef = doc(store, "izin", user.id);
      await updateStatus(izinDocRef, "Status");
    } catch (error) {
      toast.error(error.message);
      toast.error("Gagal Menghapus Izin");
    }
  };

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
              Nomor Handphone / Whatsapp
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Tanggal Izin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Keterangan
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Alasan
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
            >
              Status
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
                      src={item.bukti}
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
                  {item?.no_hp}
                </td>    
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {formattedDateIzin(item.tanggal)}
                </td>    
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.keterangan}
                </td>    
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.alasan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                  {item.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-between gap-2 mt-2">
                  <button
                    onClick={() => deleteIzin(item)}
                    type="button"
                    className="inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent text-red-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => aprove(item)}
                    type="button"
                    className="inline-flex items-center gap-x-2 text-xs p-1 font-semibold rounded-lg border border-transparent text-white bg-emerald-400 hover:bg-emerald-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Setujui
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>
                <p className="text-xl text-center text-slate-700 py-4">
                  Data Izin Kosong
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
}
