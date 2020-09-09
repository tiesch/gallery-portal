import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Pictures } from "@/interfaces/Gallery";
import { name as galleryNamespace } from "@/modules/gallery/store";
import { actionTypes as galleryActionTypes } from "@/modules/gallery/store/gallery.types";
import { namespace } from "vuex-class";
import { GalleryState } from "../../store/gallery.state";

const galleryModule = namespace(galleryNamespace);

@Component
export default class Pagination extends Vue {
  @galleryModule.Action(galleryActionTypes.GET_PICTURES)
  public getPageByNumber!: (page: number, limit: number) => Promise<Pictures>;

  @galleryModule.State("pictures")
  public galleryState!: GalleryState | null;

  public get currentPage(): number {
    return this.galleryState && this.galleryState.pictures
      ? this.galleryState.pictures.page
      : 0;
  }

  public get pageCount(): number {
    return this.galleryState && this.galleryState.pictures
      ? this.galleryState.pictures.pageCount
      : 0;
  }

  public get hasMore(): boolean {
    return this.galleryState && this.galleryState.pictures
      ? this.galleryState.pictures.hasMore
      : false;
  }

  public showPageNumber(page: number): boolean {
    const leftLimit = this.currentPage - 4;
    const rightLimit = this.currentPage + 4;
    return (
      (page > leftLimit && page < rightLimit) ||
      page === 1 ||
      page === this.pageCount
    );
  }

  public getPage(page: number) {
    const pageNumber: number =
      page === 1
        ? this.currentPage - 1
        : page === this.pageCount
        ? this.currentPage + 1
        : page;

    this.getPageByNumber(pageNumber, 9);
  }
}
