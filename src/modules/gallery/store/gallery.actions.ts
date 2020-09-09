import {
  actionTypes,
  mutationTypes
} from "@/modules/gallery/store/gallery.types";
import { GalleryState } from "@/modules/gallery/store/gallery.state";
import { ActionTree } from "vuex";
import { ApiService } from "@/api/api";
import { RootState } from "@/interfaces/Gallery";

export default function actionsFactory(
  api: ApiService
): ActionTree<GalleryState, RootState> {
  return {
    [actionTypes.GET_PICTURES](context, page: number, limit = 9) {
      return api
        .getPage(page, limit)
        .then(response => {
          context.commit(mutationTypes.GET_PICTURES_SUCCESS, response);
        })
        .catch(error => {
          console.error(error.message);
        });
    },
    [actionTypes.GET_DETAILS](context, id: string) {
      return api
        .getDetails(id)
        .then(response => {
          response.active = true;
          context.commit(mutationTypes.GET_DETAILS_SUCCESS, response);
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  } as ActionTree<GalleryState, RootState>;
}
