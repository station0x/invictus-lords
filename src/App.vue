<template>
  <div id="app">
    <!-- <div class="test-notice">
      <p>This is a test version on the Goerli Network. Feel free to test and report bugs at our <a href="
https://t.me/invictuslords" target="_blank">Telegram</a></p>
    </div> -->
    <Navbar/>
    <div class="hidden md:flex fixed left-0 top-16 z-10 h-full min-h-full">
      <Sidebar v-if="isApp && isConnected"/>
    </div>
    <!-- <div v-if="$store.state.scrollY < 200" class="notices is-bottom">
      <div v-if="lastDistribution" class="toast is-small is-danger is-bottom-left countdown-div">
        <img class="rewards-toast" src="/img/von-reward.png"/> <p style="margin-left: 40px">Next Rewards distribution round in</p> 
        <p style="color: rgb(250, 255, 0); margin-left: 10px">{{countdown}}</p></div>
    </div> -->
    <div v-if="lastDistribution && $store.state.scrollY < 200" class="flex justify-end fixed -bottom-6 right-10 z-30 w-screen">
      <div id="toast-danger" class="mb-24 lg:mb-16 flex flex-grow items-center p-2 lg:p-4 max-w-xs lg:w-full lg:max-w-sm text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-invictus-gray-700 border dark:border-invictus-gray-500" role="alert">
          <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 dark:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span class="sr-only">Error icon</span>
          </div>
          <div class="mx-2 text-xs lg:text-sm font-light">
            Next Rewards distribution round in {{countdown}}
          </div>
      </div>
    </div>
    <div class="app-body">
      <router-view></router-view>
    </div>
    <MobileSidebar class="lg:hidden"/>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import MobileSidebar from '@/components/MobileSidebar.vue'
  import axios from 'axios'
  import date from 'date-and-time'
  import dev from '../constants/dev.json'
  import prod from '../constants/prod.json'
  const CONSTANTS = import.meta.env.VITE_APP_ENV === "prod" ? prod : dev
  export default {
    data() {
      return {
        lastDistribution: undefined,
        time: Date.now(),
      }
    },
    components: {
      Navbar,
      Sidebar,
      MobileSidebar
    },
    methods: {
      responsify() {
        this.$store.commit('changeWindowWidth', window.innerWidth)
      },
      async fetchLastDistribution() {
        const res = await axios.get('/api/rewards/fetchLastDistribution')
        this.lastDistribution = res.data.lastDistribution
      },
      async distributeRewards() {
        const res = await axios.post('/api/rewards/distributeRewards')
        this.$router.go('/')
      }
    },
    computed: {
      isConnected() {
        return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
      },
      countdown() {
        if(this.lastDistribution) {
          const releaseDate = new Date((CONSTANTS.economicPolicy.releaseInterval + this.lastDistribution) * 1000)
          const nowDate = new Date(this.time)
          const countdown = new Date(date.subtract(releaseDate , nowDate).toMilliseconds()).toISOString().substr(11, 8)
          if((date.subtract(releaseDate , nowDate).toMilliseconds()/1000) <= 0) {
            this.distributeRewards()
          }
          return countdown
        } else return undefined
      },
      isApp() {
        return (this.$route.name !== 'Home'
        && this.$route.name !== 'Ecosystem'
        && this.$route.name !== 'Minting')
      }
    },
    created() {
      // this.$store.dispatch('disconnect')
      const self = this
      this.dateInterval = setInterval(function () {
        self.time = Date.now()
      }, 1000)
      this.fetchLastDistribution()
      this.$store.commit('changeWindowWidth', window.innerWidth)
      window.addEventListener("resize", this.responsify)
    },
    destroyed() {
      window.removeEventListener("resize", this.responsify)
    }
  }
</script>

<style scoped>
.test-notice {
  width: 100vw;
  background: #FF111F;
  color: white;
  padding: 5px;
  text-align: center;
}
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

 .countdown-div {
  background: black !important;
  border: 3px solid rgb(250, 255, 0);
 }
}

.rewards-toast {
  position: absolute;
  left: -8px;
  top: -14px;
  width: 62px;
 }
</style>