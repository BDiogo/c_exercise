<template>
  <v-container class="page-not-found">
    <div class="text-emoji">🚨</div>
    <div class="text-h1">404</div>
    <div class="text-h4">Page Not Found</div>
  </v-container>
</template>

<style scoped lang="scss">
.page-not-found {
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 90%;
  
  .text-emoji {
    line-height: 1.2em;
    font-size: 12rem;
  }
  div {
    display: block;
    margin: 0.5rem;
    font-weight: 600;
  }
}
</style>
