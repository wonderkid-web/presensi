### LAPORAN HARIAN ###
jadi gemini, aku mau buat menu laporan harian ku itu, menampilkan:
    nama pegawai, jam masuk, jam keluar, durasi jam kerja, 
dimana jam masuk diambil dari collection absensi_masuk dan jam keluar diambil dari collection absensi_keluar

### Workflow Halaman Laporan Harian (`src/app/(pages)/(admin)/admin/laporan/harian/page.jsx`) ###

1.  **Inisialisasi dan State:**
    *   Menggunakan `useState` untuk `selectedDate` (tanggal yang dipilih), `laporanData` (data laporan yang akan ditampilkan), dan `summary` (ringkasan kehadiran).
    *   `useRef` digunakan untuk `tableRef` untuk keperluan ekspor Excel.

2.  **Pengambilan Data (`useEffect` dan `fetchLaporanData`):**
    *   `useEffect` memanggil `fetchLaporanData` setiap kali `selectedDate` berubah.
    *   `fetchLaporanData` adalah fungsi `async` yang melakukan hal berikut:
        *   Menentukan `startOfDay` dan `endOfDay` berdasarkan `selectedDate`.
        *   Mengambil semua data pegawai dari koleksi `pegawai`.
        *   Mengambil data absensi masuk dari koleksi `absensi_masuk` untuk tanggal yang dipilih.
        *   Mengambil data absensi keluar dari koleksi `absensi_keluar` untuk tanggal yang dipilih.
        *   Mengambil data izin yang berstatus "disetujui" dari koleksi `izin`.

3.  **Pemrosesan Data Laporan:**
    *   Melakukan iterasi pada setiap data `pegawai`.
    *   Untuk setiap pegawai, menentukan status kehadiran:
        *   Mencari data absensi masuk dan keluar yang sesuai dengan NIP pegawai pada tanggal tersebut.
        *   Jika absensi masuk ditemukan:
            *   Status diatur menjadi "Hadir".
            *   `jamMasuk` diisi dengan waktu absensi masuk.
            *   Jika absensi keluar juga ditemukan, `jamKeluar` diisi dan `lamaJamKerja` dihitung (selisih jam masuk dan keluar).
        *   Jika absensi masuk tidak ditemukan, tetapi data izin dengan NIP pegawai ditemukan:
            *   Status diatur sesuai dengan `keterangan` izin (misalnya "Izin", "Sakit").
            *   `lamaJamKerja` diisi dengan `alasan` izin.
        *   Jika tidak ada absensi maupun izin, status diatur menjadi "Alpha".
    *   Hasil pemrosesan disimpan ke state `laporanData`.

4.  **Perhitungan Ringkasan:**
    *   Setelah `laporanData` terbentuk, dilakukan iterasi untuk menghitung jumlah pegawai dengan status "Hadir", "Izin", "Sakit", dan "Alpha".
    *   Hasil ringkasan disimpan ke state `summary`.

5.  **Tampilan (Render JSX):**
    *   Menampilkan judul "Laporan Harian".
    *   Input `type="date"` untuk memilih tanggal laporan.
    *   Tombol "Export Excel" menggunakan `DownloadTableExcel` dari `react-export-table-to-excel` untuk mengunduh data tabel.
    *   Menampilkan ringkasan kehadiran (Hadir, Izin, Alpha) dalam kotak-kotak informatif.
    *   Menampilkan data laporan dalam tabel HTML dengan kolom: Nama, Status, Jam Masuk, Jam Keluar, Lama Jam Kerja.
    *   Fungsi `formatJam` digunakan untuk memformat objek `Date` menjadi string jam yang mudah dibaca.

### Workflow Halaman Laporan Bulanan (`src/app/(pages)/(admin)/admin/laporan/bulanan/page.jsx`) ###

1.  **Inisialisasi dan State:**
    *   Menggunakan `useState` untuk `selectedMonth` (bulan yang dipilih dalam format YYYY-MM) dan `laporanData` (data laporan yang akan ditampilkan).
    *   `useRef` digunakan untuk `tableRef` untuk keperluan ekspor Excel.

2.  **Fungsi Pembantu (`getWorkDaysInMonth`):**
    *   Fungsi ini menghitung jumlah hari kerja (Senin-Jumat) dalam bulan dan tahun tertentu.

3.  **Pengambilan Data (`useEffect` dan `fetchLaporanData`):**
    *   `useEffect` memanggil `fetchLaporanData` setiap kali `selectedMonth` berubah.
    *   `fetchLaporanData` adalah fungsi `async` yang melakukan hal berikut:
        *   Mendapatkan `year` dan `month` dari `selectedMonth`.
        *   Menentukan `startOfMonth` dan `endOfMonth`.
        *   Memanggil `getWorkDaysInMonth` untuk mendapatkan jumlah hari kerja dalam bulan tersebut.
        *   Mengambil semua data pegawai dari koleksi `pegawai`.
        *   Mengambil data absensi masuk dari koleksi `absensi_masuk` untuk rentang bulan yang dipilih.
        *   Mengambil data izin yang berstatus "Disetujui" dari koleksi `izin` untuk rentang bulan yang dipilih.

4.  **Pemrosesan Data Laporan:**
    *   Menggunakan `Map` (`laporanMap`) untuk menyimpan data laporan per NIP pegawai.
    *   Menginisialisasi setiap pegawai dengan `hadir: 0`, `izin: 0`, `sakit: 0`, `alpha: 0`.
    *   Melakukan iterasi pada `dataAbsensiMasuk`: untuk setiap absensi masuk, menambahkan `hadir` ke pegawai yang bersangkutan.
    *   Melakukan iterasi pada `dataIzin`: untuk setiap izin, menambahkan `izin` atau `sakit` ke pegawai yang bersangkutan berdasarkan `keterangan` izin.
    *   Menghitung `alpha` untuk setiap pegawai: `alpha = max(0, workDaysInMonth - (hadir + izin + sakit))`.
    *   Mengubah `laporanMap` menjadi array (`finalLaporan`) dan menyimpannya ke state `laporanData`.

5.  **Tampilan (Render JSX):**
    *   Menampilkan judul "Laporan Bulanan".
    *   Input `type="month"` untuk memilih bulan laporan.
    *   Tombol "Export Excel" menggunakan `DownloadTableExcel`.
    *   Menampilkan data laporan dalam tabel HTML dengan kolom: Nama, Hadir, Izin, Sakit, Alpha.

### Workflow Halaman Laporan Mingguan (`src/app/(pages)/(admin)/admin/laporan/mingguan/page.jsx`) ###

1.  **Inisialisasi dan State:**
    *   Menggunakan `useState` untuk `selectedDate` (tanggal yang dipilih), `laporanData` (data laporan yang akan ditampilkan), dan `weekRange` (rentang minggu yang ditampilkan).
    *   `useRef` digunakan untuk `tableRef` untuk keperluan ekspor Excel.

2.  **Pengambilan Data (`useEffect` dan `fetchLaporanData`):**
    *   `useEffect` memanggil `fetchLaporanData` setiap kali `selectedDate` berubah.
    *   `fetchLaporanData` adalah fungsi `async` yang melakukan hal berikut:
        *   Menentukan `startOfWeek` dan `endOfWeek` berdasarkan `selectedDate`.
        *   Mengatur `weekRange` untuk tampilan.
        *   Mengambil semua data pegawai dari koleksi `pegawai`.
        *   Mengambil data absensi masuk dari koleksi `absensi_masuk` untuk rentang minggu yang dipilih.
        *   Mengambil data izin yang berstatus "Disetujui" dari koleksi `izin` untuk rentang minggu yang dipilih.

3.  **Pemrosesan Data Laporan:**
    *   Menggunakan `Map` (`laporanMap`) untuk menyimpan data laporan per NIP pegawai.
    *   Menginisialisasi setiap pegawai dengan `hadir: 0`, `izin: 0`, `sakit: 0`, `alpha: 0`.
    *   Melakukan iterasi pada `dataAbsensiMasuk`: untuk setiap absensi masuk, menambahkan `hadir` ke pegawai yang bersangkutan.
    *   Melakukan iterasi pada `dataIzin`: untuk setiap izin, menambahkan `izin` atau `sakit` ke pegawai yang bersangkutan berdasarkan `keterangan` izin.
    *   Menghitung `alpha` untuk setiap pegawai berdasarkan 5 hari kerja dalam seminggu: `alpha = max(0, 5 - (hadir + izin + sakit))`.
    *   Mengubah `laporanMap` menjadi array (`finalLaporan`) dan menyimpannya ke state `laporanData`.

4.  **Tampilan (Render JSX):**
    *   Menampilkan judul "Laporan Mingguan".
    *   Input `type="date"` untuk memilih tanggal dalam minggu laporan.
    *   Menampilkan periode minggu yang dipilih.
    *   Tombol "Export Excel" menggunakan `DownloadTableExcel`.
    *   Menampilkan data laporan dalam tabel HTML dengan kolom: Nama, Hadir, Izin, Sakit, Alpha.

### Workflow Halaman Laporan Tahunan (`src/app/(pages)/(admin)/admin/laporan/tahunan/page.jsx`) ###

1.  **Inisialisasi dan State:**
    *   Menggunakan `useState` untuk `selectedYear` (tahun yang dipilih) dan `laporanData` (data laporan yang akan ditampilkan).
    *   `useRef` digunakan untuk `tableRef` untuk keperluan ekspor Excel.

2.  **Fungsi Pembantu (`getWorkDaysInYear`):**
    *   Fungsi ini menghitung jumlah hari kerja (Senin-Jumat) dalam tahun tertentu.

3.  **Pengambilan Data (`useEffect` dan `fetchLaporanData`):**
    *   `useEffect` memanggil `fetchLaporanData` setiap kali `selectedYear` berubah.
    *   `fetchLaporanData` adalah fungsi `async` yang melakukan hal berikut:
        *   Menentukan `startOfYear` dan `endOfYear` berdasarkan `selectedYear`.
        *   Memanggil `getWorkDaysInYear` untuk mendapatkan jumlah hari kerja dalam tahun tersebut.
        *   Mengambil semua data pegawai dari koleksi `pegawai`.
        *   Mengambil data absensi masuk dari koleksi `absensi_masuk` untuk rentang tahun yang dipilih.
        *   Mengambil data izin yang berstatus "Disetujui" dari koleksi `izin` untuk rentang tahun yang dipilih.

4.  **Pemrosesan Data Laporan:**
    *   Menggunakan `Map` (`laporanMap`) untuk menyimpan data laporan per NIP pegawai.
    *   Menginisialisasi setiap pegawai dengan `hadir: 0`, `izin: 0`, `sakit: 0`, `alpha: 0`.
    *   Melakukan iterasi pada `dataAbsensiMasuk`: untuk setiap absensi masuk, menambahkan `hadir` ke pegawai yang bersangkutan.
    *   Melakukan iterasi pada `dataIzin`: untuk setiap izin, menambahkan `izin` atau `sakit` ke pegawai yang bersangkutan berdasarkan `keterangan` izin.
    *   Menghitung `alpha` untuk setiap pegawai: `alpha = max(0, workDaysInYear - (hadir + izin + sakit))`.
    *   Mengubah `laporanMap` menjadi array (`finalLaporan`) dan menyimpannya ke state `laporanData`.

5.  **Tampilan (Render JSX):**
    *   Menampilkan judul "Laporan Tahunan".
    *   Dropdown `select` untuk memilih tahun laporan.
    *   Tombol "Export Excel" menggunakan `DownloadTableExcel`.
    *   Menampilkan data laporan dalam tabel HTML dengan kolom: NIP, Nama, Hadir, Izin, Sakit, Alpha.



### ATAU VERSI 2 ###
# Dokumentasi Pembangunan Fitur Laporan (Harian, Mingguan, Bulanan, Tahunan)                                                                        │
   +                                                                                                                                                     │
   + ## 1. Permintaan Awal Pengguna                                                                                                                      │
   + Pengguna meminta pembuatan menu laporan harian, mingguan, dan bulanan yang dapat diakses dari halaman admin. Kemudian diperluas untuk laporan       │
     tahunan.                                                                                                                                            │
   +                                                                                                                                                     │
   + ## 2. Struktur Menu                                                                                                                                 │
   + - Menu "Laporan" sebagai satu item di sidebar admin.                                                                                                │
   + - Memiliki sub-menu dropdown: "Harian", "Mingguan", "Bulanan", "Tahunan".                                                                           │
   + - Implementasi di: `src/components/sidebar/sidebar-admin/page.jsx`.                                                                                 │
   +                                                                                                                                                     │
   + ## 3. Analisis Data (Sumber Data Firebase)                                                                                                          │
   + Data absensi dan izin tersebar di beberapa koleksi Firebase:                                                                                        │
   + - `absensi_masuk`: Mencatat jam masuk pegawai.                                                                                                      │
   + - `absensi_keluar`: Mencatat jam keluar pegawai.                                                                                                    │
   + - `izin`: Mencatat pengajuan izin/sakit pegawai (memiliki `status` "Disetujui", "Ditolak", "Menunggu", dan `keterangan` "Izin" atau "Sakit").       │
   + - `pegawai`: Daftar master seluruh pegawai (digunakan untuk mengidentifikasi siapa yang "Alpha").                                                   │
   + - `nip`: Digunakan sebagai kunci penghubung antar koleksi. Penting untuk selalu membersihkan (trim) nilai `nip` saat membandingkan.                 │
   +                                                                                                                                                     │
   + ## 4. Logika Laporan (Penting!)                                                                                                                     │
   +                                                                                                                                                     │
   + ### Konsep Dasar yang Benar (Setelah Koreksi Pengguna)                                                                                              │
   + Logika laporan harus dimulai dari data yang *ada* (Hadir, Izin/Sakit), baru kemudian mengidentifikasi siapa yang "Alpha".                           │
   +                                                                                                                                                     │
   + ### 4.1. Laporan Harian (`src/app/(pages)/(admin)/admin/laporan/harian/page.jsx`)                                                                   │
   + - **Tujuan:** Menampilkan detail absensi per pegawai untuk satu hari tertentu.                                                                      │
   + - **Data yang Ditampilkan:** Nama Pegawai, Status (Hadir/Izin/Sakit/Alpha), Jam Masuk, Jam Keluar, Lama Jam Kerja.                                  │
   + - **Alur Logika:**                                                                                                                                  │
   +     1.  Ambil semua data `pegawai`.                                                                                                                 │
   +     2.  Ambil data `absensi_masuk` untuk tanggal yang dipilih.                                                                                      │
   +     3.  Ambil data `absensi_keluar` untuk tanggal yang dipilih.                                                                                     │
   +     4.  Ambil data `izin` yang `status`-nya "Disetujui" untuk tanggal yang dipilih.                                                                 │
   +     5.  Iterasi melalui setiap `pegawai` dari daftar master:                                                                                        │
   +         -   Inisialisasi status pegawai sebagai "Alpha", `jamMasuk`, `jamKeluar`, `lamaJamKerja` sebagai `'-'`.                                     │
   +         -   Cari apakah pegawai tersebut memiliki entri di `absensi_masuk` untuk tanggal tersebut.                                                  │
   +             -   Jika **ADA**: Set status menjadi "Hadir", catat `jamMasuk`. Cari entri di `absensi_keluar`. Jika ditemukan, catat `jamKeluar` dan   │
     hitung `lamaJamKerja` (`jamKeluar - jamMasuk`).                                                                                                     │
   +         -   Jika **TIDAK ADA** di `absensi_masuk`, cari apakah pegawai tersebut memiliki entri di `izin` untuk tanggal tersebut.                    │
   +             -   Jika **ADA**: Set status menjadi `izin.keterangan` ("Izin" atau "Sakit"), dan `lamaJamKerja` diisi dengan `izin.alasan`.            │
   +         -   Jika **TIDAK ADA** di `absensi_masuk` maupun `izin`, statusnya tetap "Alpha".                                                           │
   +     6.  Hitung ringkasan (summary) Hadir, Izin, Sakit, Alpha dari `finalLaporan`.                                                                   │
   +                                                                                                                                                     │
   + ### 4.2. Laporan Mingguan (`src/app/(pages)/(admin)/admin/laporan/mingguan/page.jsx`)                                                               │
   + ### 4.3. Laporan Bulanan (`src/app/(pages)/(admin)/admin/laporan/bulanan/page.jsx`)                                                                 │
   + ### 4.4. Laporan Tahunan (`src/app/(pages)/(admin)/admin/laporan/tahunan/page.jsx`)                                                                 │
   + - **Tujuan:** Menampilkan rekapitulasi absensi per pegawai untuk periode waktu (minggu/bulan/tahun).                                                │
   + - **Data yang Ditampilkan:** NIP, Nama, Total Hadir, Total Izin, Total Sakit, Total Alpha.                                                          │
   + - **Alur Logika (Seragam untuk Mingguan, Bulanan, Tahunan):**                                                                                       │
   +     1.  Ambil semua data `pegawai`.                                                                                                                 │
   +     2.  Inisialisasi sebuah `Map` (`laporanMap`) di mana setiap `pegawai` memiliki `hadir: 0`, `izin: 0`, `sakit: 0`, `alpha: 0`.                   │
   +     3.  Ambil semua data `absensi_masuk` dalam periode yang dipilih.                                                                                │
   +     4.  Ambil semua data `izin` yang `status`-nya "Disetujui" dalam periode yang dipilih.                                                           │
   +     5.  Iterasi `absensi_masuk`: Untuk setiap entri, tambahkan `hadir++` ke pegawai yang sesuai di `laporanMap`.                                    │
   +     6.  Iterasi `izin`: Untuk setiap entri, tambahkan `izin++` atau `sakit++` ke pegawai yang sesuai di `laporanMap` berdasarkan `keterangan`.      │
   +     7.  Hitung `workDaysInPeriod`: Jumlah hari kerja (Senin-Jumat) dalam periode yang dipilih.                                                      │
   +     8.  Iterasi `laporanMap`: Untuk setiap pegawai, hitung `totalRecordedDays = hadir + izin + sakit`. Kemudian, `alpha = Math.max(0,               │
     workDaysInPeriod - totalRecordedDays)`.                                                                                                             │
   +                                                                                                                                                     │
   + ## 5. Implementasi Teknis Tambahan                                                                                                                  │
   +                                                                                                                                                     │
   + ### 5.1. Perbaikan `formattedDate` (`src/utils/index.js`)                                                                                           │
   + - **Masalah:** Fungsi `format` dari `date-fns` tidak bisa langsung memproses Firebase Timestamp.                                                    │
   + - **Solusi:** Modifikasi `formattedDate` untuk memeriksa apakah input `waktu` memiliki metode `toDate()`. Jika ya, panggil `waktu.toDate()` untuk   │
     mengonversinya ke objek `Date` sebelum memformat.                                                                                                   │
   +                                                                                                                                                     │
   + ### 5.2. Perbaikan Form Keterangan Izin (`src/components/admin/form/FormIzin.jsx`)                                                                  │
   + - **Perubahan:** Mengubah input `textarea` untuk "Keterangan" menjadi `select` dropdown dengan opsi "Sakit", "Izin", "Alpha".                       │
   +                                                                                                                                                     │
   + ### 5.3. Fungsionalitas Export to Excel                                                                                                             │
   + - **Implementasi:** Menggunakan `react-export-table-to-excel`.                                                                                      │
   + - **Langkah:**                                                                                                                                      │
   +     1.  Import `useRef` dan `DownloadTableExcel`, `SheetIcon` (dari `lucide-react`).                                                                │
   +     2.  Buat `const tableRef = useRef(null);`.                                                                                                      │
   +     3.  Tambahkan `ref={tableRef}` ke elemen `<table>`.                                                                                             │
   +     4.  Tambahkan komponen `DownloadTableExcel` dengan tombol di atas tabel.                                                                        │
   + - **Diterapkan pada:** Semua halaman laporan (Harian, Mingguan, Bulanan, Tahunan).                                                                  │
   +                                                                                                                                                     │
   + ### 5.4. Penyesuaian Padding                                                                                                                        │
   + - **Implementasi:** Menambahkan `className="p-4"` pada `div` pembungkus utama di setiap halaman laporan untuk memberikan padding.                   │
   +                                                                                                                                                     │
   + ### 5.5. Penanganan Error Build Vercel (Terkait `undici` dan Firebase Client SDK)                                                                   │
   + - **Masalah 1 (`TypeError: 'next' called on an object that does not implement interface Iterator.` dari `undici`):**                                │
   +     - **Penyebab:** Next.js/Webpack gagal mentranspilasi `undici` (yang digunakan oleh Firebase Auth) dengan benar untuk client-side.               │
   +     - **Solusi:** Tambahkan `undici` dan `@firebase/auth` ke `transpilePackages` di `next.config.mjs`.                                              │
   + - **Masalah 2 (`Error: Service firestore is not available`):**                                                                                      │
   +     - **Penyebab:** Firebase client SDK diinisialisasi atau diakses di lingkungan server selama proses build Next.js.                               │
   +     - **Solusi:** Kondisikan inisialisasi `getFirestore`, `getStorage`, `getAuth`, dan definisi `collection` di `src/firebase/config.js` agar       │
     hanya berjalan `if (typeof window !== 'undefined')`.                                                                                                │
   +                                                                                                                                                     │
   + ---                                                                                                                                                 │
   + **Catatan Penting untuk AI Lain:**                                                                                                                  │
   + - Selalu pastikan `nip` dibersihkan (`.trim()`) sebelum digunakan untuk perbandingan atau sebagai kunci `Map`.                                      │
   + - Perhatikan perbedaan antara data yang diambil dari Firebase (yang mungkin berupa Timestamp) dan kebutuhan fungsi `Date` JavaScript.               │
   + - Prioritaskan logika yang sederhana dan langsung berdasarkan data yang *ada*, baru kemudian hitung data yang *tidak ada* (Alpha).  