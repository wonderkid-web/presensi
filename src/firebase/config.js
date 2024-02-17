// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7MF10F7e6xmiScsJcvRAaEVXgF-P4gsQ",
  authDomain: "inventaris-4d78d.firebaseapp.com",
  projectId: "inventaris-4d78d",
  storageBucket: "inventaris-4d78d.appspot.com",
  messagingSenderId: "897690985098",
  appId: "1:897690985098:web:1c3feaeeea668e3aecc373"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
const store = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
const collectionAbsensiMasuk = collection(store, 'absensi_masuk')
const collectionAbsensiKeluar = collection(store, 'absensi_keluar')
const collectionJabatan = collection(store, 'jabatan')
const collectionPegawai = collection(store, 'pegawai')
const collectionAdmin = collection(store, 'admin')

export {store, auth, app, collectionAbsensiMasuk, collectionAbsensiKeluar, collectionJabatan, collectionPegawai, collectionAdmin, storage}
