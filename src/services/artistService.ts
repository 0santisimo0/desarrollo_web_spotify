import { db } from "./firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { Artist } from "../utils/types";

export function listenArtistsByGenre(
  genreId: string,
  callback: (artists: Artist[]) => void
) {
  const q = query(collection(db, "artists"), where("genreId", "==", genreId));
  return onSnapshot(q, (snapshot) => {
    const artists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Artist, "id">),
    }));
    callback(artists);
  });
}

export function listenArtists(callback: (artists: Artist[]) => void) {
  const q = query(collection(db, "artists"));
  return onSnapshot(q, (snapshot) => {
    const artists = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Artist, "id">),
    }));
    callback(artists);
  });
}

export async function createArtist(data: Omit<Artist, "id">) {
  const docRef = doc(collection(db, "artists"));
  await setDoc(docRef, data);
}

export async function updateArtist(
  id: string,
  data: Partial<Omit<Artist, "id">>
) {
  const docRef = doc(db, "artists", id);
  await updateDoc(docRef, data);
}

export async function deleteArtist(id: string) {
  const docRef = doc(db, "artists", id);
  await deleteDoc(docRef);
}

export async function getArtistById(artistId: string): Promise<Artist | null> {
  const docRef = doc(db, "artists", artistId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<Artist, "id">),
    };
  } else {
    return null;
  }
}
