import { mutationTypes as mutationKeys } from "@/modules/gallery/store/gallery.types";
import { GalleryState } from "@/modules/gallery/store/gallery.state";
import { MutationTree } from "vuex";
import Vue from "vue";
import { Pictures, PictureDetails } from "@/interfaces/Gallery";

export const mutations: MutationTree<GalleryState> = {
  [mutationKeys.GET_PICTURES_SUCCESS](state, pictures: Pictures) {
    Vue.set(state.pictures, "pictures", pictures);
  },
  [mutationKeys.GET_DETAILS_SUCCESS](state, details: PictureDetails) {
    Vue.set(state.details, "details", details);
  }
};
