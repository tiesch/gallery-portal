import { Module } from "vuex";
import { mutations } from "./gallery.mutations";
import { GalleryState, initialState } from "./gallery.state";
import { ApiService } from "@/api/api";
import { RootState } from "@/interfaces/Gallery";
import actionsFactory from "./gallery.actions";

export const name = "gallery";
const namespaced = true;

export const gallery: Module<GalleryState, RootState> = {
  namespaced,
  state: initialState,
  actions: actionsFactory(new ApiService()),
  mutations
};
