import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Genre } from "../utils/types";

export async function createGenre(data: Omit<Genre, "id">) {
  const docRef = doc(collection(db, "genres"));
  await setDoc(docRef, data);
}

export function listenGenres(callback: (genres: Genre[]) => void) {
  return onSnapshot(collection(db, "genres"), (snapshot) => {
    const genres = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Genre, "id">),
    }));
    callback(genres);
  });
}

export async function updateGenre(
  id: string,
  data: Partial<Omit<Genre, "id">>
) {
  const docRef = doc(db, "genres", id);
  await updateDoc(docRef, data);
}

export async function deleteGenre(id: string) {
  const docRef = doc(db, "genres", id);
  await deleteDoc(docRef);
}
