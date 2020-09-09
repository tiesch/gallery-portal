import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { GalleryState } from "@/modules/gallery/store/gallery.state";
import { RootState } from "@/interfaces/Gallery";
import { gallery } from "@/modules/gallery/store";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    gallery
  }
};

export interface ModulesState {
  gallery: GalleryState;
}

export type StoreState = RootState & ModulesState;

export default new Vuex.Store(store);
