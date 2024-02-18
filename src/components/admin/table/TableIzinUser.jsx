"use client";

import { IoIosFemale, IoIosMale } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { FaRegSquareCheck } from "react-icons/fa6";
import { collectionIzin, store } from "@/firebase/config";
import uuid from "react-uuid";
import Image from "next/image";
import useRealtime from "@/hooks/useRealtime";
import { useSession } from "next-auth/react";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale/id";
import { formattedDateIzin } from "@/utils";

export default function TableIzinUser() {
  const session = useSession();

  const { data } = useRealtime(collectionIzin);

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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length ? (
            data
              ?.filter((item) => item.email === session?.data?.user?.email)
              .map((item, i) => (
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
                    {item.jenis_kelamin == "l" ? (
                      <IoIosFemale />
                    ) : (
                      <IoIosMale />
                    )}
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
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-white font-bold dark:text-gray-200`}
                  >
                    <div
                      className={`flex gap-1 items-center text-white font-extrabold p-1 rounded-md text-xs ${
                        item.status == "pending" ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      <span>{item.status}</span>
                      {item.status == "pending" ? (
                        <CgDanger />
                      ) : (
                        <FaRegSquareCheck />
                      )}
                    </div>
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
