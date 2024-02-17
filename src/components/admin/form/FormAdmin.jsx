"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signUpAdmin, uploadImage } from "@/utils";

export default function FormAdmin() {
  const [image, setImage] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const toastId = toast.loading("Proses Mengupload Foto..");
      const profile = await uploadImage(image);
      toast.dismiss(toastId);
      toast.success("Foto Berhasil Di Upload");

      toast.promise(signUpAdmin({ ...data, profile }), {
        loading: "Membuat Akun Baru...",
        success: () => "Berhasil membuat Akun..",
        error: (e) => e.message,
      });
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 flex justify-center max-w-[85vw]">
      <form
        className=" border w-[80%] p-5 rounded-md bg-white grid grid-cols-2 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl text-center text-slate-700 font-bold col-span-2">
          Form Tambah Admin Baru
        </h1>
        <div className=" mt-4">
          <Input type="text" placeholder="NIP" {...register("nip")} />
        </div>
        <div className=" mt-4">
          <Input type="text" placeholder="email" {...register("email")} />
        </div>
        <div className=" mt-4">
          <Input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <div className=" mt-4">
          <Input type="text" placeholder="nama" {...register("nama")} />
        </div>
        <div className=" mt-4">
          <Input
            type="text"
            placeholder="tempat tanggal lahir"
            {...register("pob")}
          />
        </div>
        <div className=" mt-4">
          <select
            {...register("jenis_kelamin")}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="l">Laki-laki</option>
            <option value="p">Perempuan</option>
          </select>
        </div>
        <div className=" mt-4">
          <Input type="text" placeholder="agama" {...register("agama")} />
        </div>
        <div className=" mt-4">
          <Input type="text" placeholder="alamat" {...register("alamat")} />
        </div>
        <div className=" mt-4">
          <Input
            type="number"
            placeholder="no telepon"
            {...register("no_hp")}
          />
        </div>
        <div className="mt-4">
          <Input
            type="file"
            placeholder="foto"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="col-span-full mt-4">
          <Button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-600"
          >
            Kirim
          </Button>
        </div>
      </form>
    </div>
  );
}
