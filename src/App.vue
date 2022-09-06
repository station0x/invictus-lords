<template>
  <div id="app">
    <Navbar/>
    <div class="app-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    components: {
      Navbar
    },
    methods: {
      responsify() {
        this.$store.commit('changeWindowWidth', window.innerWidth)
      },
    },
    computed: {
      isConnected() {
        return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
      }
    },
    created() {
      // this.$store.dispatch('disconnect')
      this.$store.commit('changeWindowWidth', window.innerWidth)
      window.addEventListener("resize", this.responsify)
    },
    destroyed() {
      window.removeEventListener("resize", this.responsify)
    },
  }
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>