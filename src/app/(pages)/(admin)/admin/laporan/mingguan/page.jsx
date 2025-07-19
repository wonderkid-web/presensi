
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { store } from "@/firebase/config";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { SheetIcon } from "lucide-react";

export default function LaporanMingguan() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [laporanData, setLaporanData] = useState([]);
  const [weekRange, setWeekRange] = useState({ start: '', end: '' });
  const tableRef = useRef(null);

  useEffect(() => {
    fetchLaporanData(selectedDate);
  }, [selectedDate]);

  const fetchLaporanData = async (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    setWeekRange({ 
      start: startOfWeek.toLocaleDateString('id-ID'), 
      end: endOfWeek.toLocaleDateString('id-ID') 
    });

    // 1. Fetch all data sources for the week
    const pegawaiSnap = await getDocs(collection(store, "pegawai"));
    const dataPegawai = pegawaiSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    const qMasuk = query(collection(store, "absensi_masuk"), where("waktu", ">=", startOfWeek), where("waktu", "<=", endOfWeek));
    const absensiMasukSnap = await getDocs(qMasuk);
    const dataAbsensiMasuk = absensiMasukSnap.docs.map(doc => doc.data());

    const qIzin = query(collection(store, "izin"), where("tanggal", ">=", startOfWeek), where("tanggal", "<=", endOfWeek), where("status", "==", "Disetujui"));
    const izinSnap = await getDocs(qIzin);
    const dataIzin = izinSnap.docs.map(doc => doc.data());

    // 2. Process data with the correct logic
    const laporanMap = new Map();

    dataPegawai.forEach(p => {
      const nip = p.nip ? p.nip.trim() : null;
      if(nip) {
        laporanMap.set(nip, { ...p, hadir: 0, izin: 0, sakit: 0, alpha: 0 });
      }
    });

    dataAbsensiMasuk.forEach(a => {
      const nip = a.nip ? a.nip.trim() : null;
      if (nip && laporanMap.has(nip)) {
        laporanMap.get(nip).hadir++;
      }
    });

    dataIzin.forEach(i => {
      const nip = i.nip ? i.nip.trim() : null;
      if (nip && laporanMap.has(nip)) {
        if (i.keterangan === 'Izin') laporanMap.get(nip).izin++;
        if (i.keterangan === 'Sakit') laporanMap.get(nip).sakit++;
      }
    });

    // Calculate Alpha based on a 5-day work week
    const workDaysInWeek = 5; 
    laporanMap.forEach((pegawai, nip) => {
        const totalRecordedDays = pegawai.hadir + pegawai.izin + pegawai.sakit;
        pegawai.alpha = Math.max(0, workDaysInWeek - totalRecordedDays);
    });

    const finalLaporan = Array.from(laporanMap.values());
    setLaporanData(finalLaporan);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Laporan Mingguan</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="p-2 border rounded"
        />
        <p className="font-medium">Periode: {weekRange.start} - {weekRange.end}</p>
        <DownloadTableExcel
            filename="Laporan Mingguan"
            sheet="Laporan Mingguan"
            currentTableRef={tableRef.current}
          >
            <button className="p-1 rounded text-sm text-white bg-emerald-600 flex items-center gap-2">
              <span> Export Excel </span>
              <SheetIcon />
            </button>
          </DownloadTableExcel>
      </div>

      <table ref={tableRef} className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="py-2 px-4">NIP</th> */}
            <th className="py-2 px-4">Nama</th>
            <th className="py-2 px-4">Hadir</th>
            <th className="py-2 px-4">Izin</th>
            <th className="py-2 px-4">Sakit</th>
            <th className="py-2 px-4">Alpha</th>
          </tr>
        </thead>
        <tbody>
          {laporanData.map((item) => (
            <tr key={item.id} className="text-center border-b">
              {/* <td className="py-2 px-4">{item.nip}</td> */}
              <td className="py-2 px-4 text-left">{item.nama}</td>
              <td className="py-2 px-4">{item.hadir}</td>
              <td className="py-2 px-4">{item.izin}</td>
              <td className="py-2 px-4">{item.sakit}</td>
              <td className="py-2 px-4">{item.alpha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
