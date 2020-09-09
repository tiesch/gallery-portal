<template>
  <div id="app" style="display:flex; flex-direction:column; height: 100vh;">
    <router-view id="app-container"></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { name as galleryModuleName } from "@/modules/gallery/store";
import { namespace } from "vuex-class";
import { actionTypes as galleryActionTypes } from "@/modules/gallery/store/gallery.types";

const galleryModule = namespace(galleryModuleName);

@Component
export default class App extends Vue {
  @galleryModule.Action(galleryActionTypes.GET_PICTURES)
  public getPage!: (page: number, limit: number) => void;

  public created() {
    this.getPage(1, 9);
  }
}
</script>
