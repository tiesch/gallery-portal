import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Picture } from "@/interfaces/Gallery";

@Component
export default class Thumbnail extends Vue {
  @Prop({ default: null })
  public thumb!: Picture;

  public showDetails() {
    this.$emit("showDetails", this.thumb);
  }
}
