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
  import axios from 'axios'
  export default {
    components: {
      Navbar
    },
    methods: {
      responsify() {
        this.$store.commit('changeWindowWidth', window.innerWidth)
      },
      fetchLastDistribution() {
        axios
      }
    },
    computed: {
      isConnected() {
        return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
      },
      async rewardsCountdown() {
        // const res = await axios.get('/api/rewards/fetchLastDistribution')
        //   .then( res => 
        //     console.log(res.data.lastDistribution)
        //   )
        console.log('hello')
      },
    },
    created() {
      // this.$store.dispatch('disconnect')
      this.$store.commit('changeWindowWidth', window.innerWidth)
      window.addEventListener("resize", this.responsify)
      this.rewardsCountdown
      this.$buefy.toast.open({
          indefinite: true,
          message: `Something's not good, also I'm on <b>bottom</b>`,
          position: 'is-bottom-left',
          type: 'is-danger'
      })
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