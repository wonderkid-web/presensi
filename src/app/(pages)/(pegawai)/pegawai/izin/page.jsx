import FormIzin from "@/components/admin/form/FormIzin";
import TableIzinUser from "@/components/admin/table/TableIzinUser";
import React from "react";

export default function page() {
  return (
    <div>
      <FormIzin />
      <div className="max-w-[75vw] mx-auto overflow-auto">
        <TableIzinUser />
      </div>
    </div>
  );
}
