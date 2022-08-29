<template>
    <div class="greetings">
      <h1 class="green">Register new player</h1>
      <h3>

      </h3>
      <button @click="connectMetamask">connect metamask</button>
    </div>
  </template>
  
  <script>
    import axios from 'axios'
    import { ethers } from 'ethers'
    export default {
      name: 'app',
      data() {
        return {
          data: '',
          user: {}
        }
      },
      methods: {
        async connectMetamask() {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
            const signer = provider.getSigner()
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.listAccounts()
            const signature = await signer.signMessage("Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring")
            // this.$router.go()
            this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
            this.registerPlayer()
        },
        async registerPlayer() {
            const res = await axios.get('/api/player/registerPlayer', {
                params: {
                    signature: this.$store.state.signature,
                    providerType: "steam",
                    providerId: this.user.steamid,
                    providersData: this.$route.params.user,
                    avatar: this.user.avatar.large
                }
            }).then( res => {
                console.log(res)
            })
            return res
        },
        // encodeUserObj(obj) {
        //     const lib = JsonUrl('lzw')
        //     lib.compress(obj).then(output => { 
        //         return output
        //     })
        // }
      },
      async created() {
        const lib = JsonUrl('lzw')
        lib.decompress(this.$route.params.user).then(output => { 
           this.user = output
        })
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
  