<template>
    <div>
        <!-- <Loader v-if="!isFetched"/> -->
        <div class="nav-wrapper">
            <b-navbar transparent :fixed-top="isFixed">
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
                    <b-navbar-item @click="$router.push('/')">
                        Home
                    </b-navbar-item>
                    <b-navbar-item @click="openLeaderboard">
                        Leaderboard
                    </b-navbar-item>
                    <b-navbar-item href="#">
                        Minting
                    </b-navbar-item>
                </template>

                <template v-if="!isConnected" #end>
                    <b-navbar-item class="lord-dropdown" tag="div" style="width: fit-content">
                        <div v-if="isFixed" class="buttons">
                            <b-button :loading="mmLoader" @click="connectMetamask" class="button steam-btn">
                                <img class="steam-icon" src="/img/steam-logo.svg"/>
                                <strong>Register</strong>
                            </b-button>
                        </div>
                    </b-navbar-item>
                    <b-navbar-item class="lord-dropdown" tag="div" style="width: fit-content">
                        <div v-if="mmInstalled" class="buttons">
                            <b-button :loading="mmLoader" @click="connectMetamask" class="button metamask-btn">
                                <img class="fox-icon" src="/img/mm_fox.svg"/>
                                <strong>Connect</strong>
                            </b-button>
                        </div>
                    </b-navbar-item>
                </template>
                <template v-else-if="isConnected && !isFetched" #end>
                    <b-navbar-item style="width: 200px; margin-top: 19px">
                        <article class="media" style="width: 100%; opacity: 0.2">
                                <figure class="media-center">
                                    <p class="image is-64x64" style="margin-top: 5px; margin-right: -5px">
                                        <b-skeleton circle width="45px" height="45px"></b-skeleton>
                                    </p>
                                </figure>
                                <div class="media-content">
                                    <div class="content">
                                        <p>
                                            <b-skeleton active width="100%"></b-skeleton>
                                            <b-skeleton height="16px" width="100%"></b-skeleton>
                                        </p>
                                    </div>
                                </div>
                            </article>
                    </b-navbar-item>
                </template>
                <template v-else #end>
                    <b-navbar-item @click="claimRewards()" class="lord-dropdown total-rewards" tag="div" style="cursor: pointer; margin-right: 10px">
                        <img class="navlink-icon" src="/img/von-reward.svg"/>
                        <div class="buttons">
                            <div class="rewards-amount"><span class="navbar-subtext">{{rewardsFormatted}}</span> 
                                <div :class="{'claim-btn':true, 'elementToFadeInAndOut': claiming }">{{ claiming ? 'CLAIMING' : 'CLAIM'}}</div>
                            </div>
                            <div arrowless style="font-size: 17px; margin-left: 10px; margin-top: 5px; margin-bottom: 5px">
                                Total Rewards
                            </div>
                        </div>
                        <!-- <b-loading v-model="claiming" :is-full-page="false"></b-loading> -->
                    </b-navbar-item>
                    <b-navbar-item class="lord-dropdown total-rewards" tag="div" style="margin-right: 10px">
                        <img class="navlink-icon" src="/img/von-token.svg"/>
                        <div class="buttons">
                            <div class="rewards-amount"><span class="navbar-subtext">{{$store.state.inventory[0].balance + ' VON'}}</span></div>
                            <div arrowless style="font-size: 17px; margin-left: 10px; margin-top: 5px; margin-bottom: 5px">
                                Balance
                            </div>
                        </div>
                    </b-navbar-item>
                    <!-- <b-navbar-item @click="log('hey')" class="lord-dropdown" tag="div">
                        <img class="navlink-icon" src="/img/rewards-icon.png"/>
                        <div class="buttons">
                            <p class="lord-address">7,438</p>
                            <b-navbar-dropdown arrowless tag="div" label="$ VON Balance">
                            </b-navbar-dropdown>
                        </div>
                    </b-navbar-item> -->
                    <b-navbar-item class="lord-dropdown" tag="div" style="margin-left: -15px">
                        <img class="navlink-icon lord-avatar" :src="playerAvatar" style="transform: scale(2)"/>
                        <div class="buttons">
                            <p class="lord-address">{{lordAddress}}</p>
                            <b-navbar-dropdown tag="div" :label="formatName($store.state.profile.playerAlias)">
                                <b-navbar-item @click="openProfile">
                                    Profile
                                </b-navbar-item>
                                <b-navbar-item @click="logout">
                                    Logout
                                </b-navbar-item>
                                <!-- <b-navbar-item class="balance-section">
                                    <img style="margin-top: -20px; margin-left: -10px; margin-right: 10px;" src="/img/rewards-icon.png"/>
                                    <div style="height: 60px">
                                        <p style="margin-top: 6px">Balance</p>
                                        <p style="opacity: 0.5">7,438 $ VON</p>
                                    </div>
                                </b-navbar-item> -->
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
    import detectEthereumProvider from '@metamask/detect-provider'
    import dev from '../../constants/dev.json'
    import prod from '../../constants/prod.json'
    const CONSTANTS = import.meta.env.VITE_APP_ENV === prod ? prod : dev
    export default {
        data() {
            return {
                mmLoader: false,
                loader: false,
                loading: true,
                mmInstalled: false,
                yValue: 0,
                claiming: false
            }
        },
        components: {
            Loader
        },
        created() {
            if(typeof window.ethereum !== 'undefined') this.mmInstalled = true
            this.$store.dispatch('fetchInventory')
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeMount () {
            window.removeEventListener('scroll', this.handleScroll);
        }, 
        methods: {
            logout() {
                this.$store.dispatch('disconnect')
                // this.$router.push({name: 'Home'})
                // this.$emit('close')
            },
            async claimRewards() {
                this.claiming = true
                try {
                    window.ethereum.enable()
                    const metamaskProvider = await detectEthereumProvider()
                    if(metamaskProvider) {
                        const provider = new ethers.providers.Web3Provider(metamaskProvider, "any")
                        const signer = provider.getSigner()
                        const address = await signer.getAddress()
                        if(address !== this.$store.state.address) {
                            this.$buefy.snackbar.open({
                                // duration: 5000,
                                indefinite: true,
                                message: 'Please switch your wallet address to your logged in address',
                                type: 'is-danger',
                                position: 'is-bottom',
                                actionText: 'Close'
                            })
                            this.claiming = false
                            return;
                        }
                        let chainId = (await provider.getNetwork()).chainId
                        if(chainId !== CONSTANTS.chainInfo.chainId) {
                            await provider.provider.request({
                                method: "wallet_switchEthereumChain",
                                params: [{
                                    chainId: CONSTANTS.chainInfo.hexChainId
                                }]
                            });
                            chainId = (await provider.getNetwork()).chainId
                            if(chainId !== CONSTANTS.chainId) {
                                this.$buefy.snackbar.open({
                                    duration: 5000,
                                    message: 'Failed to switch network. Please try again',
                                    type: 'is-danger',
                                    position: 'is-bottom',
                                })
                                this.claiming = false
                                return;
                            }
                        }
                        // all check already passed, let's start claiming
                        const res = await axios.get('/api/rewards/claimRewards', {
                            params:{
                                signature:this.$store.state.signature
                            }
                        })
                        console.log(res)
                        const signature = ethers.utils.splitSignature(res.data.signature)
                        const MinterContract = new ethers.Contract(CONSTANTS.economicPolicy.minter, ["function mint(uint _amount, uint8 _v, bytes32 _r, bytes32 _s)"], signer);
                        const tx = await MinterContract.mint(
                            ethers.utils.parseEther(this.$store.state.profile.rewards.toString()),
                            signature.v,
                            signature.r,
                            signature.s
                        )
                        await tx.wait()
                        this.$store.dispatch('fetchProfile')
                        this.$store.dispatch('fetchInventory')
                        this.$buefy.snackbar.open({
                            duration: 5000,
                            message: 'Rewards Claimed! Check your balance.',
                            type: 'is-success', 
                            position: 'is-bottom'
                        })
                    } else {
                        this.$buefy.snackbar.open({
                            duration: 5000,
                            message: 'Cannot connect wallet. Please use a web3 wallet in your browser',
                            type: 'is-danger',
                            position: 'is-bottom',
                        })
                    }
                } finally {
                    this.claiming = false
                }
            },
            openLeaderboard() {
                let routeData = this.$router.resolve({ name: 'Leaderboard' })
                window.open(routeData.href, '_self')
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
                        if(res.data.success) {
                            this.$store.dispatch('connect', {signature, address})
                            this.$store.dispatch('fetchProfile')
                            this.$buefy.snackbar.open({
                                message: 'Welcome back my Lord!',
                                type: 'is-success',
                                position: 'is-top'
                            })
                            this.openProfile()
                        } else {
                            // this.$store.dispatch('connect', {signature, address})
                            this.$router.push({
                                name: 'Register',
                                params: {
                                    isMetamask: "1",
                                    user: signature
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
                        playerAddress: this.$store.state.address,
                        game: 'csgo'
                    }
                })
            },
            formatName(name) {
                if(this.$store.state.address) return name.slice(0, 11) + ' ..'
                return '--'
            },
            handleScroll () {
                this.yValue = window.scrollY
            }
        },
        async beforeMount() {
            if(this.$store.state.address) {
                this.$store.dispatch('fetchProfile')
            }
        },
        computed: {
            isConnected() {
                return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
            },
            lordAddress() {
                return this.$store.state.address.slice(0, 5) + '...' + this.$store.state.address.slice(-4)
            },
            rewardsFormatted() {
                return this.$store.state.profile.rewards ? Number(this.$store.state.profile.rewards).toLocaleString() : 0
            },
            isFetched() {
                if (!this.isConnected) return true
                else if(this.isConnected && this.$store.state.profile !== undefined) return true
                else return false
            },
            playerAvatar() {
                if(this.$store.state.profile === undefined) return '/img/blank.gif'
                else return this.$store.state.profile.avatar
            },
            isFixed() {
                return this.yValue > 50;
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
.navbar.is-fixed-top {
    width: 100%;
    padding: 10px 7.5%;
    background: rgb(0,0,0);
    background: -moz-linear-gradient(180deg, rgba(0,0,0,1) 12%, rgba(0,0,0,0) 100%);
    background: -webkit-linear-gradient(180deg, rgba(0,0,0,1) 12%, rgba(0,0,0,0) 100%);
    background: linear-gradient(180deg, rgba(0,0,0,1) 12%, rgba(0,0,0,0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
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
.steam-btn {
    border: 1.5px solid rgb(53, 53, 53);
    height: 40px;
    padding-right: 20px;
    padding-left: 50px;
    transition: all ease-in-out 200ms;
    font-weight: 300;
    font-family: 'Evogria'
}
.steam-btn:hover {
    border-color: white;
    color: white;
}
.steam-btn:focus {
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

.steam-icon {
    position: absolute;
    left: -40px;
    top: -2px;
    transform: scale(0.9);
}
.steam-icon:hover {
    color: #151B1F;
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
    width: 190px;
}
.lord-address {
    opacity: 0.7;
    position: absolute;
    left: 12px;
    top: 30px;
    font-size: 18px !important;
}
.rewards-amount {
    position: absolute;
    left: 12px;
    top: 30px;
    font-size: 18px !important;
    width: 100%;
}
img.lord-avatar {
    /* border-radius: 99px !important; */
    border: 2px solid #0B0B10;
    border-radius: 999px !important;

    /* background: url(this.$store.state.avatar) */
}
.navlink-icon {
    transform: scale(1.62);
    top: 17px;
    right: 8px;
}
.total-rewards:hover .claim-btn{
    opacity: 0.9;
    color: red; 
}
.claim-btn {
    color: red; 
    float: right; 
    right: -18px;
    font-size: 16px;
    top: -25px;
    background: rgb(0,0,0);
    background: -moz-radial-gradient(circle, rgba(0,0,0,1) 43%, transparent 95%);
    background: -webkit-radial-gradient(circle, rgba(0,0,0,1) 43%, transparent 95%);
    background: radial-gradient(circle, rgba(0,0,0,1) 43%, transparent 95%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="transparent",GradientType=1);
    padding: 0 30px 0px 30px;
    transition: all ease-out 300ms;
}
.balance-section {
    padding: 0px 26.5px !important;
    padding-top: 10px !important;
    border-top: 2px solid rgba(256,256,256,.05);
} 
.navbar.is-transparent .navbar-dropdown a.navbar-item.balance-section:hover {
    color: white !important;
}
.navbar-subtext {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    opacity: 0.7;
    font-size: 15px;
    margin-left: -3px;
}
.elementToFadeInAndOut {
    background: transparent;
    -webkit-animation: fadeinout 1s linear forwards;
    animation: fadeinout 1s linear forwards;
    animation-iteration-count: infinite;
}
@keyframes fadeinout {
    0%,100% { opacity: 0 }
    50% { opacity: 1 }
    }
</style>