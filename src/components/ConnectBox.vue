<template>
    <section class="flex items-center justify-center h-screen pb-32">
    <div class="lg:flex">
        <div class="flex items-center mx-auto md:w-[42rem] px-4 md:px-8 xl:px-0">
            <div class="w-full">
                <ol class="flex mx-auto items-center mb-6 text-sm font-medium text-center text-gray-500 dark:text-gray-400 lg:mb-12 sm:text-base">
                    <li class="flex items-center text-invictus-red-600 dark:text-invictus-red-500 sm:after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <div class="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                            <svg class="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            {{ isMetamaskTrue ? 'Metamask' : 'Steam' }} <span class="hidden sm:inline-flex">Connected</span>
                        </div>
                    </li>
                    <li class="flex items-center after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                        <div class="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500">
                            <div class="mr-2 sm:mb-2 sm:mx-auto">2</div>
                        {{ isMetamaskTrue ? 'Steam' : 'Metamask' }} <span class="hidden sm:inline-flex">Connected</span>
                        </div>
                    </li>
                    <li class="flex items-center sm:block">
                        <div class="mr-2 sm:mb-2 sm:mx-auto">3</div>
                        Play & Earn
                    </li>
                </ol>
                <h1 class="mb-4 text-2xl font-bold tracking-normal text-gray-900 sm:mb-6 leding-tight dark:text-white">Welcome to my house! Enter Freely.</h1>
                <h1 class="-mt-1 text-base font-medium tracking-normal text-invictus-gray-400 sm:mb-6 leding-tight dark:text-gray-400">One last step to start competing with other lords! link wallet to your account to be able to claim your hard-earnd rewards.</h1>
                <form action="#">
                    <div class="my-6">
                        <!-- <label for="lord-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lord Name</label> -->
                        <input type="text" name="full-name" id="full-name" class="bg-invictus-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-invictus-red-600 focus:border-invictus-red-600 block w-full p-2.5 dark:bg-invictus-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Lord Name" required="" :value="playerAlias">
                        <p class="my-2 text-sm text-gray-600 dark:text-white-500">We've generated a random anon-friendly name for you, you can change it to anything or use your default steam name</p>
                    </div>
                    <div class="-mt-2 mb-7">
                        <label for="small-toggle" class="inline-flex relative items-center mb-5 cursor-pointer" >
                            <input type="checkbox" @change="changeToggleVal" id="small-toggle" class="sr-only peer" :checked="useSteamData">
                            <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-invictus-red-300 dark:peer-focus:ring-invictus-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-invictus-red-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Use steam profile name</span>
                        </label>
                    </div>
                    <div class="flex space-x-3">
                        <!-- <a href="#" class="text-center items-center w-full py-2.5 sm:py-3.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-invictus-gray-100 hover:text-invictus-red-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-invictus-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-invictus-gray-700">Prev: Personal Info</a> -->
                        <button @click="connect" type="button" class="w-full text-white bg-invictus-red-600 hover:bg-invictus-red-700 focus:ring-4 focus:outline-none focus:ring-invictus-red-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center dark:bg-invictus-red-600 dark:hover:bg-invictus-red-700 dark:focus:ring-invictus-red-800"> {{ isMetamaskTrue ? 'Connect Steam' : 'Connect Metamask Wallet' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import { ethers } from 'ethers'
    export default {
        data () {
            return {
                steamLoader: false,
                localPlayerAlias: undefined,
                useSteamData: true,
                mmInstalled: false
            }
        },
        props: {
            isMetamask: String,
            avatar: {
                type: String,
                default() {
                    return 'https://tickplaz.sirv.com/invictus/Ellipse_2_xz7niz.png'
                }
            },
            playerAlias: String,
            user: Object,
            address: String,
            signature: String
        },
        computed: {
            isMetamaskTrue() {
                return parseInt(this.isMetamask) ? true : false
            }
        },
        beforeUpdate() {
            if(!this.isMetamaskTrue) {
                this.localPlayerAlias = this.playerAlias
            }
        },
        methods: {
        connect() {
            console.log(this.isMetamaskTrue)
            if(this.isMetamaskTrue) this.auth()
            else this.connectMetamask()
        },
        changePlayerAlias(data) {
            this.localPlayerAlias = data
        },
        changeToggleVal() {
            if(this.useSteamData) this.useSteamData = false
            else this.useSteamData = true
        },  
        async connectMetamask() {
            if(this.mmInstalled) {
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
                const signer = provider.getSigner()
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts()
                const signature = await signer.signMessage("Dear Lords! I'm confirming my ownership. (Read-only transaction)")
                // this.$router.go()
                // this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
                this.registerPlayer(signature, await signer.getAddress())
            } else {
                window.open('https://metamask.io/download/', "_blank")
            }
        },
        async registerPlayer(signature, address) {
            this.steamLoader = true
            try {
                const res = await axios.get('/api/player/registerPlayer', {
                    params: {
                        signature: signature,
                        providerType: "steam",
                        hash: this.user.steamHash,
                        avatar: this.user.avatar,
                        playerAlias: this.localPlayerAlias,
                        useSteamName: this.useSteamData
                    }
                })
            } catch(error) {
                this.$emit('error', error.response.data.msg)
                return false
            }
            this.$store.dispatch('connect', {signature, address})
            this.$store.dispatch('fetchProfile')
            this.$router.push({
                name: 'Lord Profile',
                params: {
                    playerAddress: this.$store.state.address,
                    game: 'csgo'
                }
            })
            this.steamLoader = false
            return res
        },
        async auth() {
            this.steamLoader = true
            this.$store.dispatch('registerCandidate', {signature: this.signature, username: this.playerAlias, useSteamData: this.useSteamData})
            const res = await axios.get('/api/auth/steam/getRedirect', {})
            .then( res => 
                window.open(res.data.redirectUrl, "_self")
            )
            .finally(
                this.steamLoader = true
            )
            return res
        },
      },
        created() {
            if(typeof window.ethereum !== 'undefined') this.mmInstalled = true
        }
    }
</script>

<style >
    .cb {
        color: white;
    }
    .body-text {
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 16px;
        padding: 25px 40px;
        line-height: 1.5;
    }
    .steam-btn {
        font-family: 'Evogria';
        background: radial-gradient(50% 50% at 50% 50%, rgba(86, 255, 254, 0.2) 0%, rgba(0, 215, 213, 0) 100%), #151B1F;
        border-radius: 5px;
        color: white;
        height: 60px;
        /* width: 250px; */
        border: none;
        padding-left: 80px;
        padding-right: 40px;
        margin-top: 20px;
        transition: all ease-out 500ms;
        display: block;
    }
    .steam-btn:hover {
        background: white;
        color: black;
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
    .mm-btn {
        font-family: 'Evogria';
        border-radius: 5px;
        color: white;
        height: 60px;
        /* width: 250px; */
        border: none;
        padding-left: 85px;
        padding-right: 40px;
        margin-top: 30px;
        transition: all ease-out 500ms;
        background: radial-gradient(50% 50% at 50% 50%, rgba(1, 1, 6, 0.2) 0%, rgba(1, 1, 6, 0) 100%), #E2761B;
        display: block;
    } 
    .mm-btn:hover {
        background: white;
        color: #E2761B;
    }
    .background-overlay {
        background: black;
        top: 46%;
        width: 100%;
        height: 40.5%;
        position: absolute;
    }
    input.input.playerAlias-input {
        font-family: 'Evogria' !important;
        font-size: 18px;
        width: 100%;
        text-align: center;
    }
    .playerAlias-input-wrapper {
        width: fit-content;
    }
    .playerAlias-input-label {
        color: red;
        font-size: 16px;
        letter-spacing: 0.08em;
        margin-bottom: 0.2em !important;
        margin-top: 0.3em;
    }
    .absolute-checkbox {
        margin-top: 8px;
    }
</style>
    