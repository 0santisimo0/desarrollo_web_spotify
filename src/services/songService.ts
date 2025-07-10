import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Song } from "../utils/types";

export function listenSongsByArtist(
  artistId: string,
  callback: (songs: Song[]) => void
) {
  const q = query(collection(db, "songs"), where("artistId", "==", artistId));
  return onSnapshot(q, (snapshot) => {
    const songs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Song, "id">),
    }));

    const uniqueSongs = songs.filter(
      (song, index, self) =>
        index === self.findIndex((s) => s.mp3Url === song.mp3Url)
    );

    callback(uniqueSongs);
  });
}


export async function createSong(data: Omit<Song, "id">) {
  const docRef = doc(collection(db, "songs"));
  await setDoc(docRef, data);
}

export async function updateSong(id: string, data: Partial<Omit<Song, "id">>) {
  const docRef = doc(db, "songs", id);
  await updateDoc(docRef, data);
}

export async function deleteSong(id: string) {
  const docRef = doc(db, "songs", id);
  await deleteDoc(docRef);
}
