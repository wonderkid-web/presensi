'use client'

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
      // alert('pegawai dengan data' + JSON.stringify(data, null, 2) + 'absen');
    };


  return (
    <div className=" p-8">
      <nav className=" p-3 border-b flex justify-between items-center">
        <h1 className=" text-xl font-medium">Absen Pegawai</h1>
        <ul className=" flex items-center gap-4">
          <span>Azzam</span>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </ul>
      </nav>

      <div className=" p-4">
        <h1 className=" mt-9 text-xl">Selamat datang</h1>
        <h2 className=" mt-8">
          Masukan input data diri anda sebagai penanda di bawah ini!!
        </h2>
        <form
          className=" border w-full p-5 rounded-md bg-white"
        >
          <h1 className=" text-center">Data pegawai</h1>
          <div className=" mt-4">
            <Input type="text" placeholder="NIP" {...register("nip")} />
          </div>
          <div className=" mt-4">
            <Input type="text" placeholder="nama" {...register("nama")} />
          </div>
          <div className=" mt-4">
            <Input
              type="text"
              placeholder="absen pegawai"
              {...register("absen-pegawai")}
            />
          </div>
          <div className=" mt-4">
            <Input type="text" placeholder="waktu" {...register("waktu")} />
          </div>
          <div className=" mt-4 flex gap-5">
            <Button type="submit" className="bg-blue-500 w-[50%]" onClick={handleSubmit(onClickAbsen)}>
              Absen
            </Button>
            <Button type="submit" className="bg-yellow-500 w-[50%]">
              Klik jika tidak hadir atau izin
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
