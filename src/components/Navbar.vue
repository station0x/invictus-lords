<template>
    <div>
        <Loader v-if="!isFetched"/>
        <div v-else class="nav-wrapper">
            <img v-if="!$store.getters.isMobile" class="lord-avatar" :src="$store.state.profile.avatar">

            <b-navbar transparent>
                <template #brand>
                    <b-navbar-item tag="router-link" :to="{ path: '/' }">
                        <img
                            class="nav-logo"
                            src="/img/logo.png"
                            width="100px"
                        >
                    </b-navbar-item>
                </template>
                <template #start>
                    <b-navbar-item href="#">
                        Home
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Minting
                    </b-navbar-item>
                </template>

                <template #end>
                    <b-navbar-item class="lord-dropdown" tag="div">
                        <div v-if="!isConnected" class="buttons">
                            <b-button :loading="mmLoader" @click="connectMetamask" class="button metamask-btn">
                                <img class="fox-icon" src="/img/mm_fox.svg"/>
                                <strong>Login</strong>
                            </b-button>
                        </div>
                        <div v-else class="buttons">
                            <p class="lord-address">{{lordAddress}}</p>
                            <b-navbar-dropdown tag="div" :label="$store.state.profile.playerAlias">
                                <b-navbar-item @click="openProfile">
                                    Profile
                                </b-navbar-item>
                                <b-navbar-item @click="logout">
                                    Logout
                                </b-navbar-item>
                            </b-navbar-dropdown>
                        </div>
                    </b-navbar-item>
                </template>
            </b-navbar>
            <!-- <p>{{ this.$store.state.address }}</p>
            <p>{{ this.$store.state.profile.playerAlias }}</p> -->
        </div>
    </div>
</template>

<script>
    import { ethers } from 'ethers'
    import axios from 'axios'
    import Loader from '@/components/Loader.vue'
    export default {
        data() {
            return {
                mmLoader: false,
                loader: true
            }
        },
        components: {
            Loader
        },
        methods: {
            logout() {
                this.$store.dispatch('disconnect')
                // this.$router.push({name: 'Home'})
                // this.$emit('close')
            },
            async connectMetamask() {
                this.mmLoader = true   
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
                const signer = provider.getSigner()
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts()
                try {
                    const signature = await signer.signMessage("Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring")
                    const address = await signer.getAddress()
                    const res = await axios.get('/api/player/isRegisteredPlayer', {
                        params:{
                            signature: signature
                        }
                    }).then(res => {
                        console.log(res)
                        if(res.data.success) {
                            console.log('ds')
                            this.$store.dispatch('connect', {signature, address})
                            this.$store.dispatch('fetchProfile')
                            this.$buefy.snackbar.open({
                                message: 'Welcome back my Lord!',
                                type: 'is-success',
                                position: 'is-top'
                            })
                        } else {
                            this.$store.dispatch('connect', {signature, address})
                            this.$router.push({
                                name: 'Register',
                                params: {
                                    isMetamask: "1"
                                }
                            })
                        }
                    })
                    return res
                } catch(err) {
                    this.mmLoader = false
                } finally {
                    this.mmLoader = false
                }
            },
            openProfile() {
                this.$router.push({
                    name: 'Lord Profile',
                    params: {
                        playerAddress: this.$store.state.address
                    }
                })
            }
        },
        async beforeMount() {
            this.$store.dispatch('fetchProfile')
        },
        computed: {
            isConnected() {
                return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
            },
            lordAddress() {
                return this.$store.state.address.slice(0, 5) + '...' + this.$store.state.address.slice(-4)
            },
            isFetched() {
                return this.isConnected && this.$store.state.profile != undefined
            }
        }
    } 
</script>
  
<style scoped>
.nav-wrapper {
    max-width: 1400px;
    width: 85%;
    position: absolute;
    top: 25px;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    background-color: transparent;
    z-index: 2;
}
.metamask-btn {
    border: 1.5px solid rgb(53, 53, 53);
    height: 40px;
    padding-right: 20px;
    padding-left: 50px;
    transition: all ease-in-out 200ms;
    font-weight: 300;
    font-family: 'Evogria'
}
.metamask-btn:hover {
    border-color: #F6851B;
    color: #F6851B;
}
.metamask-btn:focus {
    border: 1.5px solid rgb(53, 53, 53);
    color: white;
    box-shadow: none;
}
.fox-icon {
    position: absolute;
    left: -40px;
    top: -2px;
    transform: scale(1.1);
}
.nav-logo {
    max-height: fit-content !important;
}
.navbar.is-transparent .navbar-dropdown a.navbar-item:focus, .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {
    color: red !important;
}
.navbar.is-transparent .navbar-dropdown a.navbar-item:focus, .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {
    color: red !important;
}
.navbar-dropdown a.navbar-item {
    padding-right: 0;
}
.navbar-dropdown {
    top: 130% !important;
}
.lord-dropdown {
    margin-top: -30px;
    font-size: 14px !important;
}
.lord-address {
    opacity: 0.7;
    position: absolute;
    left: 12px;
    top: 30px;
    font-size: 18px !important;
}
img.lord-avatar {
    /* border-radius: 99px !important; */
    position: absolute;
    right: 175px;
    top: 36px;
    border: 2px solid #0B0B10;
    border-radius: 999px !important;
    width: 45px;
    height: 45px;
    /* background: url(this.$store.state.avatar) */
}
</style>