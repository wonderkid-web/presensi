"use client";

import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { store } from "@/firebase/config";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { SheetIcon } from "lucide-react";

export default function LaporanHarian() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [laporanData, setLaporanData] = useState([]);
  const [summary, setSummary] = useState({ hadir: 0, izin: 0, sakit: 0, alpha: 0 });
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered for selectedDate:", selectedDate);
    fetchLaporanData(selectedDate);
  }, [selectedDate]);

  const fetchLaporanData = async (date) => {
    console.log("fetchLaporanData called with date:", date);
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 1. Fetch all data sources
    const pegawaiSnap = await getDocs(collection(store, "pegawai"));
    const dataPegawai = pegawaiSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    const qMasuk = query(collection(store, "absensi_masuk"), where("waktu", ">=", startOfDay), where("waktu", "<=", endOfDay));
    const absensiMasukSnap = await getDocs(qMasuk);
    const dataAbsensiMasuk = absensiMasukSnap.docs.map(doc => doc.data());

    const qKeluar = query(collection(store, "absensi_keluar"), where("waktu", ">=", startOfDay), where("waktu", "<=", endOfDay));
    const absensiKeluarSnap = await getDocs(qKeluar);
    const dataAbsensiKeluar = absensiKeluarSnap.docs.map(doc => doc.data());

    const qIzin = query(collection(store, "izin"), where("status", "==", "disetujui"));
    const izinSnap = await getDocs(qIzin);
    const dataIzin = izinSnap.docs.map(doc => doc.data());

    // 2. Process data by checking status for every employee
    const finalLaporan = dataPegawai.map(pegawai => {
      const nip = pegawai.nip ? String(pegawai.nip).trim() : null;
      if (!nip) return null; // Skip if employee has no NIP

      const record = {
        ...pegawai,
        status: 'Alpha',
        jamMasuk: '-',
        jamKeluar: '-',
        lamaJamKerja: '-'
      };

      const absensiMasuk = dataAbsensiMasuk.find(a => a.nip && String(a.nip).trim() === nip);
      const izin = dataIzin.find(i => i.nip && String(i.nip).trim() === nip);

      if (absensiMasuk) {
        record.status = 'Hadir';
        record.jamMasuk = absensiMasuk.waktu.toDate();
        const absensiKeluar = dataAbsensiKeluar.find(a => a.nip && String(a.nip).trim() === nip);
        if (absensiKeluar) {
          record.jamKeluar = absensiKeluar.waktu.toDate();
          const diffMs = record.jamKeluar - record.jamMasuk;
          const diffHours = Math.floor(diffMs / 3600000); // hours
          const diffMins = Math.floor((diffMs % 3600000) / 60000); // minutes
          record.lamaJamKerja = `${diffHours} jam ${diffMins} menit`;
        }
      } else if (izin) {
        record.status = izin.keterangan;
        record.lamaJamKerja = izin.alasan; // Display reason for leave/sickness
      }

      return record;
    }).filter(Boolean); // Remove null records

    setLaporanData(finalLaporan);

    // 3. Calculate summary
    let hadir = 0, izin = 0, sakit = 0, alpha = 0;
    finalLaporan.forEach(l => {
      switch (l.status) {
        case 'Hadir': hadir++; break;
        case 'Izin': izin++; break;
        case 'Sakit': sakit++; break;
        case 'Alpha': alpha++; break;
      }
    });
    setSummary({ hadir, izin, sakit, alpha });
  };

  const formatJam = (jam) => {
    if (jam instanceof Date) {
      return jam.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return jam;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Laporan Harian</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="p-2 border rounded"
        />
        <DownloadTableExcel
            filename="Laporan Harian"
            sheet="Laporan Harian"
            currentTableRef={tableRef.current}
          >
            <button className="p-1 rounded text-sm text-white bg-emerald-600 flex items-center gap-2">
              <span> Export Excel </span>
              <SheetIcon />
            </button>
          </DownloadTableExcel>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 justify-center mx-auto w-2/3 ml-4">
        <div className="p-4 bg-green-100 rounded"><h2 className="font-bold">Hadir</h2><p>{summary.hadir}</p></div>
        <div className="p-4 bg-yellow-100 rounded"><h2 className="font-bold">Izin</h2><p>{summary.izin}</p></div>
        {/* <div className="p-4 bg-orange-100 rounded"><h2 className="font-bold">Sakit</h2><p>{summary.sakit}</p></div> */}
        <div className="p-4 bg-red-100 rounded"><h2 className="font-bold">Alpha</h2><p>{summary.alpha}</p></div>
      </div>

      <table ref={tableRef} className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="py-2 px-4">NIP</th> */}
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Jam Masuk</th>
            <th className="py-2 px-4">Jam Keluar</th>
            <th className="py-2 px-4">Lama Jam Kerja</th>
          </tr>
        </thead>
        <tbody>
          {laporanData.map((item) => (
            <tr key={item.id} className="text-center border-b">
              {/* <td className="py-2 px-4">{item.nip}</td> */}
              <td className="py-2 px-4 text-left">{item.nama}</td>
              <td className="py-2 px-4">{item.status}</td>
              <td className="py-2 px-4">{formatJam(item.jamMasuk)}</td>
              <td className="py-2 px-4">{formatJam(item.jamKeluar)}</td>
              <td className="py-2 px-4 text-left">{item.lamaJamKerja}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}