
export interface ICurrentUser {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  primary_address_id: string;
  email: string;
  profile_photo_url: string;
  role: "admin" | "user"|"organizer";
}

export interface IUploadProgress {
  loaded: number;
  total?: number;
  progress?: number;
  bytes: number;
  rate?: number;
  estimated?: number;
}
