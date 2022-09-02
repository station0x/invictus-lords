<template>
    <div class="greetings">
      <h3>
        <center>
          <ConnectBox v-if="!isMetamask" :user="user" :isMetamask="$route.params.isMetamask" :avatar="user.avatar.large" :username="user.username"/>
          <ConnectBox v-else :isMetamask="$route.params.isMetamask"/>
        </center>
      </h3>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    import { ethers } from 'ethers'
    import ConnectBox from '@/components/SVGs/ConnectBox.vue'

    export default {
      components: {
        ConnectBox
      },
      data() {
        return {
          isMetamask: undefined,
          user: {
            avatar: {
              large: undefined
            }
          }
        }
      },
      async created() {
        this.isMetamask = parseInt(this.$route.params.isMetamask) ? true : false
        if(this.isMetamask && this.$store.state.address == null) this.$router.push('/')
        else if(!this.isMetamask && this.$route.params.user === undefined) this.$router.push('/')
        if(!this.isMetamask) {
          const lib = JsonUrl('lzw')
          lib.decompress(this.$route.params.user).then(output => { 
            this.user = output
          })
        }
      }
    }
  </script>
  
  <style scoped>
  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
  }
  
  h3 {
    font-size: 1.2rem;
  }
  
  .greetings h1,
  .greetings h3 {
    position: absolute;
    top: calc(20vh);
    left: 50%;
    transform: translate(-50%, 0vh);
    text-align: center;
  }
  
  @media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
      display: block;
      text-align: left;
    }
  }
  </style>
  