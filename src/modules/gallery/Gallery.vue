<template>
  <div class="d-flex justify-content-center flex-wrap mb-3">
    <div class="d-flex flex-row justify-content-center flex-wrap mb-3">
      <Thumbnail
        v-for="photo in gallery"
        :key="photo.id"
        :thumb="photo"
        @showDetails="showDetails"
      />
    </div>
    <Pagination />
    <PhotoDetail :pictureId="pictureId" />
  </div>
</template>

<script lang="ts" src="./Gallery.ts"></script>
