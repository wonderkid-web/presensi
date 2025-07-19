
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { store } from "@/firebase/config";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { SheetIcon } from "lucide-react";

export default function LaporanBulanan() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [laporanData, setLaporanData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered for selectedMonth:", selectedMonth);
    fetchLaporanData(selectedMonth);
  }, [selectedMonth]);

  const getWorkDaysInMonth = (year, month) => {
    let workDays = 0;
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek > 0 && dayOfWeek < 6) { // Monday to Friday
            workDays++;
        }
        date.setDate(date.getDate() + 1);
    }
    return workDays;
  }

  const fetchLaporanData = async (monthYear) => {
    const [year, month] = monthYear.split('-').map(Number);
    
    const startOfMonth = new Date(year, month - 1, 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(year, month, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const workDaysInMonth = getWorkDaysInMonth(year, month - 1);

    // 1. Fetch all data sources for the month
    const pegawaiSnap = await getDocs(collection(store, "pegawai"));
    const dataPegawai = pegawaiSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    const qMasuk = query(collection(store, "absensi_masuk"), where("waktu", ">=", startOfMonth), where("waktu", "<=", endOfMonth));
    const absensiMasukSnap = await getDocs(qMasuk);
    const dataAbsensiMasuk = absensiMasukSnap.docs.map(doc => doc.data());

    const qIzin = query(collection(store, "izin"), where("tanggal", ">=", startOfMonth), where("tanggal", "<=", endOfMonth), where("status", "==", "Disetujui"));
    const izinSnap = await getDocs(qIzin);
    const dataIzin = izinSnap.docs.map(doc => doc.data());

    // 2. Process data
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

    // Calculate Alpha
    laporanMap.forEach((pegawai, nip) => {
        const totalRecordedDays = pegawai.hadir + pegawai.izin + pegawai.sakit;
        pegawai.alpha = Math.max(0, workDaysInMonth - totalRecordedDays);
    });

    const finalLaporan = Array.from(laporanMap.values());
    setLaporanData(finalLaporan);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Laporan Bulanan</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        />
        <DownloadTableExcel
            filename="Laporan Bulanan"
            sheet="Laporan Bulanan"
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
