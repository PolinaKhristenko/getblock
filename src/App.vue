<template>
  <div id="app">
      <header></header>
      <MainPage></MainPage>
      <footer></footer>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'

export default {

  name: 'App',
  components: {
    MainPage
  },
}
</script>

<style src="./assets/styles/tailwind.css"></style>
