import FormAdmin from "@/components/admin/form/FormAdmin";
import TableAdmin from "@/components/admin/table/TableAdmin";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <FormAdmin />

      <div className="p-8 flex flex-col mx-auto gap-5 max-w-[75vw]">
        <div className="flex justify-between">
          <h1 className="text-2xl text-slate-700 font-semibold">
            Data Admin
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
            <TableAdmin />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
