"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addIzin, formattedDateIzin, uploadImage } from "@/utils";
import { useSession } from "next-auth/react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { id } from "date-fns/locale/id";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FormIzin() {
  const { data: session } = useSession();
  const [selectedDay, setSelectedDay] = useState();
  const [image, setImage] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const toastId = toast.loading("Proses Mengupload Bukti Izin..");
      const bukti = await uploadImage(image);
      toast.dismiss(toastId);
      toast.success("Foto Berhasil Di Upload");
      const payload = {
        ...session.user,
        ...data,
        bukti,
        status: "pending",
        tanggal: selectedDay,
        // tanggal: formattedDateIzin(selectedDay),
      };
      toast.promise(addIzin(payload), {
        loading: "Membuat Izin Baru...",
        success: () => "Berhasil membuat izin..",
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
          Form Pelampiran Surat Izin
        </h1>
        <div className=" mt-4">
          <label
            htmlFor="keterangan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Keterangan
          </label>
          <select
            {...register("keterangan")}
            id="keterangan"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Pilih Keterangan</option>
            <option value="Sakit">Sakit</option>
            <option value="Izin">Izin</option>
            <option value="Alpha">Alpha</option>
          </select>
        </div>
        <div className=" mt-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Alasan
          </label>
          <textarea
            {...register("alasan")}
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tulis Alasan kamu disini.."
          ></textarea>
        </div>
        <div className=" mt-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tanggal Izin
          </label>
          <Popover>
            <PopoverTrigger>
              <Button
                type="button"
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !selectedDay && "text-muted-foreground"
                )}
              >
                {selectedDay ? (
                  format(selectedDay, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DayPicker
                mode="single"
                locale={id}
                selected={selectedDay}
                onSelect={(date) => {
                  const isoDate = date.toISOString();
                  setSelectedDay(isoDate);
                }}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="mt-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bukti Izin
          </label>
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
