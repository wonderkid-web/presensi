
import TableIzin from "@/components/admin/table/TableIzin";
import { Suspense } from "react";

export default function page() {
  const data = [
    {
      no: 1,
      id_pegawai: 9897152,
      nama: "supri",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
    {
      no: 2,
      id_pegawai: 7272712,
      nama: "hafiz",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
    {
      no: 3,
      id_pegawai: 9897152,
      nama: "ersa",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
    {
      no: 4,
      id_pegawai: 9897152,
      nama: "damas",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
  ];

  return (
    <div className="max-w-[100vw] p-8">
      <div className="p-8 flex flex-col mx-auto gap-5 max-w-[75vw]">
        <h1 className="text-2xl text-slate-700 font-semibold">
          Table Izin Pegawai
        </h1>

        <div className="max-w-[85vw] overflow-auto bg-white rounded-md">
          <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
            <TableIzin />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
