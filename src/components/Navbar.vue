<template>
    <div class="nav-wrapper">
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
                    Documentation
                </b-navbar-item>
                <b-navbar-dropdown label="Info">
                    <b-navbar-item href="#">
                        About
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Contact
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>

            <template #end>
                <b-navbar-item tag="div">
                    <div v-if="isConnected" class="buttons">
                        <a @click="connectMetamask" class="button metamask-btn">
                            <img class="fox-icon" src="/img/mm_fox.svg"/>
                            <strong>Login</strong>
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
        <!-- <p>{{ this.$store.state.address }}</p>
        <p>{{ this.$store.state.profile.playerAlias }}</p> -->
        <button v-if="!isConnected" @click="logout">Logout</button>
    </div>
</template>

<script>
    import { ethers } from 'ethers'
    export default {
        data() {
            return {
    
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('disconnect')
                // this.$router.push({name: 'Home'})
                // this.$emit('close')
            },
                async connectMetamask() {
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
                const signer = provider.getSigner()
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts()
                const signature = await signer.signMessage("Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring")
                // this.$router.go()
                this.$store.dispatch('connect', {signature, address: await signer.getAddress()})
                try {
                    const res = await axios.get('/api/player/fetchPlayerProfile', {
                        params:{
                            address: state.address
                        }
                    })
                    console.log(res)
                } catch(err) {(e) => console.log(e)}
            }
        },
        async beforeMount() {
            this.$store.dispatch('fetchProfile')
        },
        computed: {
            isConnected() {
                return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
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
}
.metamask-btn:hover {
    border-color: #F6851B;
    color: #F6851B;
}
.fox-icon {
    position: absolute;
    left: 10px;
    transform: scale(1.1);
}
.nav-logo {
    max-height: fit-content;
}
</style>