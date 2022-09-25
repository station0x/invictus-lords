<template>
  <div>
    <Loader v-if="isLoading"/>
    <!-- <div v-else class="greetings"> -->
      <h3>
        <!-- <center> -->
          <ConnectBox v-if="!isMetamask" :user="user" :signature="signature" :address="address" :isMetamask="$route.params.isMetamask" :avatar="user.avatar" :playerAlias="user.username"/>
          <ConnectBox v-else :isMetamask="$route.params.isMetamask" :playerAlias="user.username" :signature="this.$route.params.user"/>
        <!-- </center> -->
      </h3>
    <!-- </div> -->
  </div>
</template>
  
  <script>
    import axios from 'axios'
    import { ethers } from 'ethers'
    import ConnectBox from '@/components/ConnectBox.vue'
    import Loader from '@/components/Loader.vue'
    import { generateUsername } from "unique-username-generator"
    const lib = JsonUrl('lzw')
    export default {
      components: {
        ConnectBox,
        Loader
      },
      data() {
        return {
          isLoading: false,
          isMetamask: undefined,
          signature: undefined,
          address: undefined,
          user: {
            avatar: undefined,
            steamHash: undefined,
            username: undefined
          }
        }
      },
      methods: {
        async registerPlayer(signature, address, username, useSteamData) {
          const res = await axios.get('/api/player/registerPlayer', {
            params: {
              signature: signature,
              providerType: "steam",
              hash: this.user.steamHash,
              avatar: this.user.avatar,
              playerAlias: username,
              useSteamName: useSteamData
            }
          }).then(() => {
            this.$store.dispatch('connect', {signature, address})
            this.$store.dispatch('fetchProfile')
            this.$router.push({
              name: 'Lord Profile',
              params: {
                playerAddress: this.$store.state.address,
                game: 'csgo'
                }
              })
            }).finally (() => {
              this.isLoading = false
            })
            return res
        }
      },
      async created() {
        this.isMetamask = parseInt(this.$route.params.isMetamask) ? true : false
        if(this.isMetamask) {
          try {
            const address = ethers.utils.verifyMessage("Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring", ethers.utils.splitSignature(this.$route.params.user))
            const validAddress = ethers.utils.isAddress(address)
            this.user.username = generateUsername("-") + "#" +  Math.floor(1000 + Math.random() * 9000)
            if(!validAddress) this.$router.push('/')
            // this.$store.dispatch('registerCandidate', {signature: this.$route.params.user, username: this.user.username, useSteamData: false})
          } catch(err) {
            this.$router.push('/')
          }
        } else if(!this.isMetamask && this.$route.params.user === undefined) this.$router.push('/')
        if(!this.isMetamask) {
          this.isLoading = true
          if(this.$store.state.candidateSignature) {
            await lib.decompress(this.$route.params.user).then(output => {
              this.user.avatar = output.avatar
              this.user.steamHash = output.steamHash
              this.user.playerAlias = output.username
            })
            const candidateSignature = this.$store.state.candidateSignature
            const candidateUsername = this.$store.state.candidateUsername
            const candidateUseSteamData = this.$store.state.candidateUseSteamData
            const address = ethers.utils.verifyMessage("Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring", ethers.utils.splitSignature(candidateSignature))
            await this.registerPlayer(candidateSignature, address, candidateUsername, candidateUseSteamData)
            this.$store.dispatch('unregisterCandidate')
          } else {
            await lib.decompress(this.$route.params.user).then(output => { 
              this.user = output
            })
          }
          this.isLoading = false
        } else {

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
    top: calc(17vh);
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
  