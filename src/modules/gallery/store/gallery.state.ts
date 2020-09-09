import { Pictures, PictureDetails } from "@/interfaces/Gallery";

export interface GalleryState {
  pictures: Pictures;
  details: PictureDetails;
}

export const initialState: GalleryState = {
  pictures: {
    pictures: [],
    page: 0,
    pageCount: 0,
    hasMore: false
  },
  details: {
    id: "",
    author: "",
    camera: "",
    tags: "",
    cropped_picture: "",
    full_picture: "",
    active: false
  }
};
