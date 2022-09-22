<template>
  <div id="app">
    <div class="test-notice">
      <p>This is a test version on the Goerli Network. Feel free to test and report bugs at our <a href="
https://t.me/invictuslords" target="_blank">Telegram</a></p>
    </div>
    <Navbar/>
    <div v-if="$store.state.scrollY < 200" class="notices is-bottom">
      <div v-if="lastDistribution" class="toast is-small is-danger is-bottom-left countdown-div">
        <img class="rewards-toast" src="/img/von-reward.png"/> <p style="margin-left: 40px">Next Rewards distribution round in</p> 
        <p style="color: rgb(250, 255, 0); margin-left: 10px">{{countdown}}</p></div>
    </div>
    <div class="app-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  import axios from 'axios'
  import date from 'date-and-time'
  import dev from '../constants/dev.json'
  import prod from '../constants/prod.json'
  const CONSTANTS = import.meta.env.VITE_APP_ENV === prod ? prod : dev
  export default {
    data() {
      return {
        lastDistribution: undefined,
        time: Date.now()
      }
    },
    components: {
      Navbar
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