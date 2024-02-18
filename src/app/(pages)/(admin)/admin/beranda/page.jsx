import React from 'react'
import Image from 'next/image'

export default async function page() {
  return (
    <div className=' p-8'>
      <h1 className=' text-2xl font-semibold text-center text-slate-700'>
        Selamat Datang Di Website Admin Presensi Pegawai
      </h1>
      <div className=' mt-8 mx-auto border w-[65vw] h-[50vh] flex justify-center items-center bg-white relative'>
        <Image src={'https://www.ptpn4.co.id/wp-content/uploads/2016/12/Profil.jpg'} fill sizes='100vw' objectFit='cover' />
      </div>
      <h1 className=' mt-4 text-center text-slate-600 text-xl'>Temukan Data Terkini mengenai Presensi.</h1>
    </div>
  )
}
