import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { PictureDetails } from "@/interfaces/Gallery";
import { name as galleryNamespace } from "@/modules/gallery/store";
import { actionTypes as galleryActionTypes } from "@/modules/gallery/store/gallery.types";
import { namespace } from "vuex-class";
import { GalleryState } from "../../store/gallery.state";
import PanZoom from "@andi23rosca/vue-pan-zoom";

const galleryModule = namespace(galleryNamespace);

@Component({
  components: {
    PanZoom
  }
})
export default class PhotoDetail extends Vue {
  public picturesInfo: PictureDetails[] = [];

  @Prop({ default: null })
  public pictureId!: string | null;

  @galleryModule.Action(galleryActionTypes.GET_DETAILS)
  public getDetails!: (id: string) => Promise<PictureDetails>;

  @galleryModule.State("pictures")
  public galleryState!: GalleryState | null;

  @galleryModule.State("details")
  public detailsState!: GalleryState | null;

  @Watch("pictureId")
  public async updatePicture() {
    if (this.pictureId) {
      this.mapGallery();
      await this.getDetails(this.pictureId);
      this.picturesInfo = this.picturesInfo.reduce(
        (acc: PictureDetails[], item: PictureDetails) => {
          item.active = false;

          if (item.id === this.pictureId && this.detailsState) {
            item = this.detailsState.details;
          }
          return [...acc, item];
        },
        []
      );
      (window as any).$("#photoModal").modal("show");
    }
  }

  private mapGallery() {
    if (
      this.galleryState &&
      this.galleryState.pictures &&
      this.galleryState.pictures.pictures
    ) {
      this.galleryState.pictures.pictures.map((picture, index) => {
        this.picturesInfo = [
          ...this.picturesInfo,
          {
            id: picture.id,
            author: "",
            camera: "",
            tags: "",
            cropped_picture: picture.cropped_picture,
            full_picture: "",
            active: index === 0 ? true : false
          }
        ];
      });
    }
  }

  public get disablePrevious() {
    if (
      this.galleryState &&
      this.galleryState.pictures &&
      this.galleryState.pictures.pictures
    ) {
      const firstPicture = this.picturesInfo[0];
      const activePicture = this.picturesInfo.find(
        picture => picture.active === true && picture.id === firstPicture.id
      );
      return activePicture !== undefined;
    }
    return false;
  }

  public get disableNext() {
    if (
      this.galleryState &&
      this.galleryState.pictures &&
      this.galleryState.pictures.pictures
    ) {
      const lastPicture = this.galleryState.pictures.pictures[
        this.galleryState.pictures.pictures.length - 1
      ];
      const activePicture = this.picturesInfo.find(
        picture => picture.active === true && picture.id === lastPicture.id
      );
      return activePicture !== undefined;
    }
    return false;
  }

  public async previousPicture() {
    this.setPicture("prev");
  }

  public async nextPicture() {
    this.setPicture("next");
  }

  public closeModal() {
    this.picturesInfo = [];
  }

  private async setPicture(direction: string) {
    const activePicture = this.picturesInfo.find(
      picture => picture.active === true
    );
    if (activePicture && this.detailsState) {
      const pictureIndex: number = this.picturesInfo.findIndex(
        picture => picture.id === activePicture.id
      );
      const nextPicture = this.picturesInfo[
        pictureIndex + (direction === "prev" ? -1 : +1)
      ];
      const alreadyExists = this.picturesInfo.find(
        picture => picture.id === nextPicture.id
      );

      if (alreadyExists && alreadyExists.full_picture !== "") {
        activePicture.active = false;
        alreadyExists.active = true;
      } else {
        await this.getDetails(nextPicture.id);
        this.picturesInfo = this.picturesInfo.reduce(
          (acc: PictureDetails[], item: PictureDetails) => {
            item.active = false;

            if (item.id === nextPicture.id && this.detailsState) {
              item = this.detailsState.details;
            }
            return [...acc, item];
          },
          []
        );
      }
      (window as any).$("#photoModal").carousel(direction);
    }
  }
}
