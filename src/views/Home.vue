<template>
  <div>
    <div class="landing-one">
      <div class="center-wrapper">
        <img class="center" src="/img/logo-large.png" style="user-select: none;"/>
          <h1 class="one-text" style="font-size: 28px">Play everyday games</h1>
          <h1 class="one-text" style="font-size: 52px">And earn <span style="color: #FF111F">$VAMP</span></h1>
          <h1 class="one-text" style="margin-top: 10px; font-family: 'Evogria';font-size: 23; color: #FAFF00;">Earn rewards by playing</h1>
          <img
            class="center"
            src="/img/csgo-small.png"
            width="100px" 
          >
          <b-button @click="auth" :loading="steamLoader" class="center steam-btn">
            <img class="steam-logo" src="/img/steam-logo.svg"/>
            Sign up with Steam
          </b-button>
      </div>
    </div>
    <div class="landing-two">
      <object class="why" data="/img/problem.svg" width="500"></object>

      <!-- <h1 class="green">Hello</h1>
      <button @click="auth">Sign up with Steam</button>
      <button @click="connectMetamask">Login with Metamask</button>

      <h3>
        You’ve successfully created a project with
        <a target="_blank" href="https://vitejs.dev/">{{data}}</a> +
        <a target="_blank" href="https://v2.vuejs.org/">Vue 2</a>.
      </h3> -->
      
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { ethers } from 'ethers'
  export default {
    name: 'app',
    data() {
      return {
        steamLoader: false,
        data: '',
        user: {}
      }
    },
    methods: {
      async auth() {
        this.steamLoader = true
        const res = await axios.get('/api/auth/steam/getRedirect', {})
        .then( res => 
          window.open(res.data.redirectUrl, "_self")
        )
        .finally(
          this.steamLoader = true
        )
        return res
      }
    }
  }
</script>

<style scoped>
.landing-one {
  width: 100vw;
  height: 100vh;
  background-image: url('/img/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.one-text {
  font-family: 'Evogria Italic';
  font-style: normal;
  font-weight: 400;
  line-height: 49px;
  text-align: center;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.landing-two {
  width: 100vw;
  height: 100vh;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 50%; */
}
.center-wrapper {
  /* width: 700px;
  margin: 0 auto;
  align-items: center;
  padding-top: 190px; */
  position: absolute;
  top: calc(50% - 12.5vh);
  left: 50%;
  transform: translate(-50%, -25%);
}
.steam-btn {
  font-family: 'Evogria';
  background: radial-gradient(50% 50% at 50% 50%, rgba(86, 255, 254, 0.2) 0%, rgba(0, 215, 213, 0) 100%), #151B1F;
  border-radius: 5px;
  color: white;
  height: 60px;
  /* width: 250px; */
  border: none;
  padding-left: 65px;
  padding-right: 20px;
  margin-top: 20px;
  transition: all ease-out 500ms;
}
.steam-btn:focus {
  color: white;
}
.steam-btn:hover .steam-logo {
  filter: invert(1);
}
.steam-logo {
  position: absolute; 
  width: 33px; margin-bottom: -5px; 
  margin-left: -43px; 
  margin-top: -4px
}                                                                                                         
.why {
  font-family: 'Evogria' !important;
  margin: 0 auto;
  width: 75%;
  position: absolute;
  top: calc(50% - 12.5vh);
  left: 50%;
  transform: translate(-50%, -25%);
}
tspan {
  font-family: 'Evogria';
}
@media (min-width: 1400px) {
  .center-wrapper {
    /* transform: scale(1.15); */
    
  }
}
</style>
