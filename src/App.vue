<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Où voir <span class="hero">Thomas&nbsp;Chapeaux</span> faire de l'impro&nbsp;?</h1>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <a href="https://github.com/tchapeaux/voir-tchap-impro" target="_blank">Voir le code source</a>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  text-align: center;
}

.hero {
  font-weight: 900;
  color: teal;
}

footer {
  margin-top: 32px;
  width: 100%;
  text-align: center;
}
</style>
