<template>
  <body>
    <header >
      <NavBar class="sticky top-0 z-50"/>
    </header>
    <main>
      <router-view />
    </main>
  </body>
</template>

<script>
import NavBar from "./components/navbar.vue";
export default {
  name: "app",
  components: {
    NavBar,
  },
};
</script>
<style>
</style>