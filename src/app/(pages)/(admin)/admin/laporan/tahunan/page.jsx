"use client";

import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { store } from "@/firebase/config";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { SheetIcon } from "lucide-react";

export default function LaporanTahunan() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [laporanData, setLaporanData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered for selectedYear:", selectedYear);
    fetchLaporanData(selectedYear);
  }, [selectedYear]);

  const getWorkDaysInYear = (year) => {
    let workDays = 0;
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      while (date.getMonth() === month) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek > 0 && dayOfWeek < 6) { // Monday to Friday
          workDays++;
        }
        date.setDate(date.getDate() + 1);
      }
    }
    return workDays;
  }

  const fetchLaporanData = async (year) => {
    const startOfYear = new Date(year, 0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    const endOfYear = new Date(year, 11, 31);
    endOfYear.setHours(23, 59, 59, 999);

    const workDaysInYear = getWorkDaysInYear(year);

    // 1. Fetch all data sources for the year
    const pegawaiSnap = await getDocs(collection(store, "pegawai"));
    const dataPegawai = pegawaiSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    const qMasuk = query(collection(store, "absensi_masuk"), where("waktu", ">=", startOfYear), where("waktu", "<=", endOfYear));
    const absensiMasukSnap = await getDocs(qMasuk);
    const dataAbsensiMasuk = absensiMasukSnap.docs.map(doc => doc.data());

    const qIzin = query(collection(store, "izin"), where("tanggal", ">=", startOfYear), where("tanggal", "<=", endOfYear), where("status", "==", "Disetujui"));
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
        pegawai.alpha = Math.max(0, workDaysInYear - totalRecordedDays);
    });

    const finalLaporan = Array.from(laporanMap.values());
    setLaporanData(finalLaporan);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Laporan Tahunan</h1>
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="yearSelect" className="font-medium">Pilih Tahun:</label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border rounded"
        >
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <DownloadTableExcel
            filename="Laporan Tahunan"
            sheet="Laporan Tahunan"
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
