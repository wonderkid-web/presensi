
export default function page() {
  const data = [
    {
      no: 1,
      id_pegawai: 9897152,
      nama: "supri",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
    {
      no: 2,
      id_pegawai: 7272712,
      nama: "hafiz",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
    {
      no: 3,
      id_pegawai: 9897152,
      nama: "ersa",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
    {
      no: 4,
      id_pegawai: 9897152,
      nama: "damas",
      ket: "izin",
      alasan: "sakit",
      waktu: "senin 02-oktober-2028",
      bukti: "surat",
      aksi: "dirumah",
    },
  ];

  return (
    <div className=" p-8">
      <h1 className=" text-2xl font-semibold">Data Keterangan</h1>
      <table className=" w-full mt-6 bg-white rounded-md">
        <tr className=" border">
          <th className=" p-4">No</th>
          <th className=" p-4">ID pegawai</th>
          <th className=" p-4">Nama</th>
          <th className=" p-4">Keterangan</th>
          <th className=" p-4">Alasan</th>
          <th className=" p-4">Waktu</th>
          <th className=" p-4">Bukti</th>
          <th className=" p-4">Aksi</th>
        </tr>
        {data.map((items) => (
          <tr key={items.id_pegawai} className=" border">
            <td className=" p-4">{items.no}</td>
            <td className=" p-4">{items.id_pegawai}</td>
            <td className=" p-4">{items.nama}</td>
            <td className=" p-4">{items.ket}</td>
            <td className=" p-4">{items.alasan}</td>
            <td className=" p-4">{items.waktu}</td>
            <td className=" p-4">{items.bukti}</td>
            <td className=" p-4">{items.aksi}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
