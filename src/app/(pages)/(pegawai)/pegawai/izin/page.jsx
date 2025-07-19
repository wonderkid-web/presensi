"use client"
import FormIzin from "@/components/admin/form/FormIzin";
import TableIzinUser from "@/components/admin/table/TableIzinUser";
import React from "react";

export default function Page() {
  
console.log("FormIzin", FormIzin);
console.log("TableIzinUser", TableIzinUser);
  return (
    <div>
      <FormIzin />
      <div className="max-w-[75vw] mx-auto overflow-auto">
        <TableIzinUser />
      </div>
    </div>
  );
}
