<template>
  <nav>
    <ul class="pagination" v-if="pageCount > 1">
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ disabled: currentPage === page }"
      >
        <button
          v-if="showPageNumber(page)"
          type="button"
          class="page-link"
          @click="getPage(page)"
        >
          {{ page === 1 ? "Previous" : page === pageCount ? "Next" : page }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./Pagination.ts"></script>
