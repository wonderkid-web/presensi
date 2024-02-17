import Link from "next/link";
import FormPegawai from "@/components/admin/form/FormPegawai";
import TablePegawai from "@/components/admin/table/TablePegawai";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <FormPegawai />

      <div className="p-8 flex flex-col mx-auto gap-5 max-w-[75vw]">
        <div className="flex justify-between">
          <h1 className="text-2xl text-slate-700 font-semibold">
            Data Pegawai
          </h1>
          <Link
            className="p-2 rounded bg-slate-200 text-slate-600 hover:bg-slate-300 text-sm"
            href="https://console.firebase.google.com/u/1/project/inventaris-4d78d/authentication/users?hl=id"
          >
            Hapus Email
          </Link>
        </div>

        <div className="max-w-[85vw] overflow-auto bg-white rounded-md">
          <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
            <TablePegawai />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
