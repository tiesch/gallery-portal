import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import Thumbnail from "./Components/thumbnail/Thumbnail.vue";
import { Picture } from "@/interfaces/Gallery";
import PhotoDetail from "@/modules/gallery/Components/photoDetail/PhotoDetail.vue";
import Pagination from "@/modules/gallery/Components/pagination/Pagination.vue";
import { name as galleryNamespace } from "./store";
import { GalleryState } from "./store/gallery.state";
import { Watch } from "vue-property-decorator";

const galleryModule = namespace(galleryNamespace);

@Component({
  components: {
    Thumbnail,
    PhotoDetail,
    Pagination
  }
})
export default class Gallery extends Vue {
  public gallery: Picture[] = [];

  @galleryModule.State("pictures")
  public galleryState!: GalleryState | null;

  @Watch("galleryState.pictures.pictures")
  public async updateGallery() {
    this.gallery =
      this.galleryState && this.galleryState.pictures
        ? this.galleryState.pictures.pictures
        : [];
  }

  public pictureId: string | null = null;

  public async showDetails(photo: Picture) {
    this.pictureId = photo.id;
  }
}
