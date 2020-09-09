<template>
  <div class="p-2 bd-highlight">
    <div class="card" style="width: 18rem;">
      <div class="thumb">
        <progressive-img
          :src="thumb.cropped_picture"
          :blur="30"
          class="card-img-top"
          alt="cropped picture"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ thumb.name }}</h5>
        <p class="card-text">{{ thumb.description }}</p>
        <button type="button" class="btn btn-primary" @click="showDetails()">
          More details
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Thumbnail.scss"></style>
<script lang="ts" src="./Thumbnail.ts"></script>
