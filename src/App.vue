<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const titleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // Animate title
  const tl = gsap.timeline()
  const wordsBefore = titleRef.value?.querySelectorAll('.title-word-before')
  const hero = titleRef.value?.querySelector('.hero')
  const wordsAfter = titleRef.value?.querySelectorAll('.title-word-after')

  if (wordsBefore && hero && wordsAfter) {
    tl.from(wordsBefore, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    })
      .from(hero, {
        scale: 0,
        rotation: -10,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)'
      })
      .from(wordsAfter, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.4,
        ease: 'back.out(1.7)'
      })
  }
})
</script>

<template>
  <header>
    <h1 ref="titleRef">
      <span class="title-word-before">Où voir</span> <span class="hero">Thomas Chapeaux</span>
      <span class="title-word-after"> faire de l'impro ?</span>
    </h1>
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
  display: inline-block;
}

.title-word {
  display: inline-block;
}

footer {
  margin-top: 32px;
  width: 100%;
  text-align: center;
}
</style>
