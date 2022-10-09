<template>
  <div>
    <Loader v-if="isLoading"/>
    <!-- <div v-else class="greetings"> -->
      <h3 v-else>
        <!-- <center> -->
          <ConnectBox v-if="!isMetamask" :user="user" :signature="signature" :address="address" :isMetamask="$route.params.isMetamask" :avatar="user.avatar" :playerAlias="user.username" @error="openToast('Address already registered, use another wallet address or log in using metamask!', 'danger')" />
          <ConnectBox v-else :isMetamask="$route.params.isMetamask" :playerAlias="user.username" :signature="this.$route.params.user" @error="openToast('Address already registered, use another wallet address or log in using metamask!', 'danger')" />
        <!-- </center> -->
      </h3>
    <!-- </div> -->
    <!-- toast -->
    <div v-if="toastUp" class="flex fixed top-5 z-50 w-screen mx-auto items-end justify-center">
        <div id="toast-danger" class="mb-16 flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-invictus-gray-700 border dark:border-invictus-gray-500" role="alert">
            <div v-if="toastType === 'danger'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-invictus-red-100 rounded-lg dark:bg-invictus-red-800 dark:text-red-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div v-if="toastType === 'success'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="mx-3 text-sm font-normal">{{ toastMsg }}</div>
            <button @click="closeToast" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-invictus-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-invictus-gray-800 dark:hover:bg-invictus-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    </div>
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
          toastUp: false,
          toastMsg: '',
          toastType: '',
          error: null,
          user: {
            avatar: undefined,
            steamHash: undefined,
            username: undefined
          }
        }
      },
      methods: {
        openToast(msg, type) {
            this.toastMsg = msg
            this.toastUp = true
            this.toastType = type
            setTimeout(() => {
                this.closeToast()
            }, 10000)

        },
        openModal(data) {
            this.modalData = data
            this.modalUp = true
        },
        closeToast() {
            this.toastUp = false
            this.toastMsg = ''
            this.toastType = ''
        },
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
            const address = ethers.utils.verifyMessage("Dear Lords! I'm confirming my ownership. (Read-only transaction)", ethers.utils.splitSignature(this.$route.params.user))
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
            const address = ethers.utils.verifyMessage("Dear Lords! I'm confirming my ownership. (Read-only transaction)", ethers.utils.splitSignature(candidateSignature))
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
  