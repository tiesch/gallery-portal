<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <span class="navbar-brand mb-0 h1">Photo gallery</span>
    </nav>
    <div class="app-container container-sm">
      <router-view :class="`view-${$route.name}`"></router-view>
    </div>
    <div class="app-footer"></div>
  </div>
</template>

<script lang="ts" src="./Layout.ts"></script>
