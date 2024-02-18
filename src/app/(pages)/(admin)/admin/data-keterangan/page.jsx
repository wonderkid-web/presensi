
import TableIzin from "@/components/admin/table/TableIzin";
import { Suspense } from "react";

export default function page() {


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
