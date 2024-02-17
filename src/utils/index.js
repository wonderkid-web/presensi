import {
  auth,
  collectionAdmin,
  collectionPegawai,
  storage,
} from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
} from "firebase/auth";
import { addDoc, deleteDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { signIn, signOut } from "next-auth/react";
import uuid from "react-uuid";
import { toast } from "sonner";

export const siginin = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    if (user) {
      return signIn("credentials", { redirect: false, email, password });
    }
  } catch (error) {
    console.log('error di signin')
    console.log(error.message)
  }
};

export const signout = () => signOut();

export const signUp = async (user) => {
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (createUser.user) {
      const newUser = await addDoc(collectionPegawai, user);
      return newUser.id;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const signUpAdmin = async (user) => {
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    if (createUser.user) {
      const newUser = await addDoc(collectionAdmin, user);
      return newUser.id;
    }
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const uploadImage = async (image) => {
  const imageRef = ref(storage, `cover/${uuid()}-${image.name}}`);

  const raw = await uploadBytes(imageRef, image);
  const link = await getDownloadURL(raw.ref);
  return link;
};


export const deleteData = async (docRef, subject) =>{
  toast.promise(deleteDoc(docRef), {
    loading: `Proses Menghapus ${subject}`,
    success: () => "Proses Berhasil",
    error: () => "Proses Gagal",
    description: () => {
      return `Data ${subject} berhasil dihapus`;
    },
  });
}