<template>
  <div
    class="modal fade"
    id="photoModal"
    tabindex="-1"
    aria-labelledby="photoModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content bg-dark text-white">
        <div class="modal-body m-0 p-0">
          <button
            type="button"
            class="closeButton"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div>
            <div
              id="carouselControls"
              class="carousel slide"
              data-interval="false"
            >
              <a
                class="carousel-control-prev"
                :class="{ invisible: disablePrevious }"
                href="#"
                role="button"
                @click="previousPicture()"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                :class="{ invisible: disableNext }"
                href="#"
                role="button"
                @click="nextPicture()"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="sr-only">Next</span>
              </a>
              <div class="carousel-inner fullPicture">
                <div
                  v-for="(info, index) in picturesInfo"
                  :key="index"
                  class="carousel-item"
                  :class="{ active: info.active }"
                >
                  <pan-zoom :max-zoom="3" :min-zoom="1" class="p-0">
                    <progressive-img
                      :src="(info && info.full_picture) || ''"
                      :placeholder="(info && info.cropped_picture) || ''"
                      :blur="30"
                      class="d-block w-100 progressive"
                      alt="full picture"
                    />
                  </pan-zoom>
                  <dl class="row p-3 m-0 pictureInfo">
                    <dt class="col-sm-3">Author</dt>
                    <dd class="col-sm-9">
                      {{ (info && info.author) || "" }}
                    </dd>
                    <dt class="col-sm-3">Camera</dt>
                    <dd class="col-sm-9">
                      {{ (info && info.camera) || "" }}
                    </dd>
                    <dt class="col-sm-3">Tags</dt>
                    <dd class="col-sm-9">
                      {{ (info && info.tags) || "" }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./PhotoDetail.scss"></style>
<script lang="ts" src="./PhotoDetail.ts"></script>
