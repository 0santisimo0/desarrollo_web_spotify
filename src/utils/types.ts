export type Genre = {
  id: string;
  name: string;
  imageUrl: string;
};

export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  createdAt: number;
  role: UserRole;
}

export type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  genreId: string;
};

export type Song = {
  id: string;
  name: string;
  artistId: string;
  mp3Url: string;
};

export type UserRole = "admin" | "user";
