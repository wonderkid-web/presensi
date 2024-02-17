"use client";

import React from "react";

// shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// library
import { useForm } from "react-hook-form";

export default function Page() {
  const { register, handleSubmit, reset } = useForm();

  const onClickAbsen = (data) => {
    // alert("pegawai dengan data" + JSON.stringify(data, null, 2) + "absen");
  };

  return (
    <div className=" p-8">
      <nav className=" p-3 border-b flex justify-between items-center">
        <h1 className=" text-xl font-medium">Keterangan</h1>
        <ul className=" flex items-center gap-4">
          <span>Azzam</span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </ul>
      </nav>

      <div className=" p-4">
        <h1 className=" mt-9 text-xl">Silahkan masukan keterangan anda</h1>
        <form className=" border w-full p-5 rounded-md mt-9 bg-white">
          <h1 className=" text-center">Data pegawai</h1>
          <div className=" mt-4">
            <Input type="text" placeholder="NIP" {...register("nip")} />
          </div>
          <div className=" mt-4">
            <Input type="text" placeholder="Nama" {...register("nama")} />
          </div>
          <div className=" mt-4">
            <Input
              type="text"
              placeholder="Keterangan"
              {...register("keterangan")}
            />
          </div>
          <div className=" mt-4">
            <Input type="text" placeholder="Alasan" {...register("alasan")} />
          </div>
          <div className=" mt-4">
            <Input type="file" {...register("foto")} />
          </div>
          <div className=" mt-4">
            <Input type="text" placeholder="waktu" {...register("waktu")} />
          </div>
          <div className=" mt-4 flex gap-5">
            <Button
              type="submit"
              className="bg-blue-500 w-[50%]"
              onClick={handleSubmit(onClickAbsen)}
            >
              Beri keterangan
            </Button>
            <Button type="submit" className="bg-red-500 w-[50%]">
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
