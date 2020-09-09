export interface Pictures {
  pictures: Picture[];
  page: number;
  pageCount: number;
  hasMore: boolean;
}

export interface Picture {
  id: string;
  cropped_picture: string;
}

export interface PictureDetails extends Picture {
  author: string;
  camera: string;
  tags: string;
  full_picture: string;
  active: boolean;
}

export interface Token {
  auth: string;
  token: string;
}

export interface RootState {
  version: string;
}
