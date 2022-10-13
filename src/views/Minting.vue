<template>
    <div>
        <section class="p-10 w-full">
            <img class="mx-auto" src="/img/minting-art-header.jpg"/>
        </section>
        <section class="p-10 pb-0 w-full">
            <h1 class="text-white text-5xl font-extrabold text-center"> Welcome to <br/> Invictus Lords NFTs</h1>
            <p class="w-2/3 py-4 mx-auto text-invictus-gray-400 text-xl font-normal text-center"> It’s not just a pfp, NFTs promote their holders to claim an airdrop of the platform governance tokens. NFTs boost the holder’s daily rewards, based on the three main classes of NFTs (Vampire Houses, see the explanatory section below). Besides that, the NFTs are also part of story that coming soon (‘’Invictus Matamorphosis’’), and reflect the genesis of a vampire from an embryo to adulthood.</p>
            <div class="flex justify-center">
                <a href="#minting" class="text-white capitalize bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-4 focus:outline-none focus:ring-invictus-red-300 font-normal rounded-lg text-normal px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-invictus-red-800 dark:hover:bg-invictus-red-600 dark:focus:ring-invictus-red-800">
                    Mint an Embryo
                </a>
            </div>
            <img class="py-16 mx-auto" src="/img/embryos.png"/>
        </section>
        <section class="p-10 w-full">
            <div class="max-w-screen-xl mx-auto">
                <h1 class="text-white text-5xl font-extrabold text-center"> Embryogenesis <br/> 'Revealing'</h1>
                <p class="w-2/3 py-4 mx-auto text-invictus-gray-400 text-xl font-normal text-center">After 7 days of closing the sale on NFTs, your vampire NFT will be revealed on Opensea.</p>
                <carousel :loop="true" class="py-5 mx-auto" :paginationEnabled="false" :autoplayHoverPause="false" :autoplay="true" :perPageCustom="[[768, 3], [1024, 4]]">
                    <slide v-for="i in 24" :key="i">
                        <img class="px-4" :src="`/img/vampires/${i}.jpg`"/>
                    </slide>
                </carousel>
            </div>
        </section>
        <section class="bg-white dark:bg-invictus-gray-900 px-10 py-16">
            <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
                <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">
                    <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                        <span id="badge-dismiss-dark" class="inline-flex items-center mb-5 py-1 pl-1 pr-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-3xl dark:bg-gray-700 dark:text-gray-300">
                            <span id="badge-dismiss-dark" class="inline-flex items-center py-1 px-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-2xl dark:bg-[#24E2E1] dark:text-black ">
                                1,000 Embryo
                            </span>
                            5% Rewards boost
                        </span>
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">House Invictus</h1>
                        <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                            Contemporary immune vampires descending from Siegfried – a grandson of Count Vlad III of Wallachia. They don’t share much of their qualities with their ancestors  feed on human blood (unlike Karnsteins). Their technological advancement enabled them to invent the Invictus Cronus Potion, which is a superior alternative to natural blood.  
                        </p>
                
                    </div>
                    <div class="flex col-span-6 align-middle justify-center">
                        <img src="/img/invictus.png" class="dark:hidden" alt="mockup">
                        <img src="/img/invictus.png" class="hidden dark:block" alt="mockup dark">
                    </div>
                </div>
            </div>
            <div class="hidden lg:flex max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
                <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">
                    <div class="flex col-span-6 align-middle justify-center">
                        <img src="/img/karnstein.png" class="dark:hidden" alt="mockup">
                        <img src="/img/karnstein.png" class="hidden dark:block" alt="mockup dark">
                    </div>
                    <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                        <span id="badge-dismiss-dark" class="inline-flex items-center mb-5 py-1 pl-1 pr-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-3xl dark:bg-gray-700 dark:text-gray-300">
                            <span id="badge-dismiss-dark" class="inline-flex items-center py-1 px-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-2xl dark:bg-invictus-red-900 dark:text-white ">
                                611 Embryo
                            </span>
                            10% Rewards boost
                        </span>
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">House Karnstein</h1>
                        <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                            Ruthless warriors & blood thirsty fighters. Karnsteins are born in battlefield as most of them were transformed into vampires by founder mother Countess “Carmilla Karnstein’’ during the era of the “Great War”. Karnsteins are experts in war and putting military strategies into action. Their long history of dark arts and sorcery made many royals regard them as an outrageous militants. They use humans as a livestock to harness fresh blood, or as ‘’forgemasters’’.   
                        </p>
                
                    </div>
                </div>
            </div>
            <div class="lg:hidden max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
                <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">
                    <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                        <span id="badge-dismiss-dark" class="inline-flex items-center mb-5 py-1 pl-1 pr-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-3xl dark:bg-gray-700 dark:text-gray-300">
                            <span id="badge-dismiss-dark" class="inline-flex items-center py-1 px-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-2xl dark:bg-invictus-red-900 dark:text-black ">
                                611 Embryo
                            </span>
                            10% Rewards boost
                        </span>
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">House Karnstein</h1>
                        <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                            Ruthless warriors & blood thirsty fighters. Karnsteins are born in battlefield as most of them were transformed into vampires by founder mother Countess “Carmilla Karnstein’’ during the era of the “Great War”. Karnsteins are experts in war and putting military strategies into action. Their long history of dark arts and sorcery made many royals regard them as an outrageous militants. They use humans as a livestock to harness fresh blood, or as ‘’forgemasters’’.   
                        </p>
                    </div>
                    <div class="flex col-span-6 align-middle justify-center">
                        <img src="/img/karnstein.png" class="dark:hidden" alt="mockup">
                        <img src="/img/karnstein.png" class="hidden dark:block" alt="mockup dark">
                    </div>
                </div>
            </div>
            <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
                <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">
                    <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                        <span id="badge-dismiss-dark" class="inline-flex items-center mb-5 py-1 pl-1 pr-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-3xl dark:bg-gray-700 dark:text-gray-300">
                            <span id="badge-dismiss-dark" class="inline-flex items-center py-1 px-4 mr-2 text-xs font-medium text-gray-800 bg-gray-100 rounded-2xl dark:bg-[#ec8f0f] dark:text-black ">
                                409 Embryo
                            </span>
                            15% Rewards boost
                        </span>
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">House Vlad</h1>
                        <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                            Arstiocrats with a long list of intellects and powerful leaders. Their true power came from wisdom, philosophy and natural science. They committed themselves, since the time of Vlad ‘the elder’ to not to drink any human blood, and prohibited the practice of dark arts and magic.  Vlads see no harm in collaborating with human especially in knowledge and scientific matters.   
                        </p>
                
                    </div>
                    <div class="flex col-span-6 align-middle justify-center">
                        <img src="/img/vlad.png" class="dark:hidden" alt="mockup">
                        <img src="/img/vlad.png" class="hidden dark:block" alt="mockup dark">
                    </div>
                </div>
            </div>
        </section>
        <section id="minting">
            <div class="px-10 pb-16 grow flex justify-center">
                <div href="#" class="flex max-w-screen-xl flex-col items-center bg-white rounded-lg border shadow-md lg:flex-row hover:bg-invictus-gray-100 dark:border-invictus-gray-700 dark:bg-invictus-gray-800 dark:hover:bg-invictus-gray-700">
                    <img class="object-cover h-full rounded-t-lg" src="/img/vampiresGIF.png"/>
                    <div class="flex h-full py-14 px-12 flex-col justify-center p-4 leading-normal">
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl xl:text-6xl dark:text-white">Get your Embryo</h1>
                        <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                            In addition to holding Invictus Lords NFTs perks, your purchase help fund the project initially.  
                        </p>
                        <form class="py-2">
                            <div class="flex">
                                <button class="cursor-default flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-invictus-gray-100 border-t border-l border-b border-gray-300 rounded-l-l dark:bg-invictus-gray-700 rounded-l-lg dark:text-white dark:border-invictus-gray-600" type="button">Embryos</button>
                                <div class="relative w-full">
                                    <input v-model="purchaseAmount" type="number" min="0" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-invictus-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-red-700 focus:border-red-500 dark:bg-invictus-gray-700 dark:border-l-invictus-gray-600  dark:border-invictus-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-red-500" placeholder="Embryos number" required>
                                    <button @click="purchaseAmount = maxAmount" type="button" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-red-700 rounded-r-lg border border-red-700 hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800">
                                        Max
                                    </button>
                                </div>
                            </div>
                        </form>
                        <form class="py-2">
                            <div class="flex">
                                <button class="cursor-default flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-invictus-gray-100 border-t border-l border-b border-gray-300 rounded-l-l dark:bg-invictus-gray-700 rounded-l-lg dark:text-white dark:border-invictus-gray-600" type="button">Total</button>
                                <div class="relative w-full">
                                    <input :disabled="true" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-invictus-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-red-700 focus:border-red-500 dark:bg-invictus-gray-700 dark:border-l-invictus-gray-600  dark:border-invictus-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-red-500" placeholder="" required>
                                    <button type="button" class="cursor-default absolute top-0 right-0 p-2.5 text-sm font-normal text-white opacity-30 bg-transparent rounded-r-lg pr-5">
                                        ETH
                                    </button>
                                </div>
                            </div>
                        </form>
                        <button @click="mint" type="button" class="mt-4 text-white capitalize bg-gray-700cursor-not-allowed  font-normal rounded-lg text-normal px-5 py-2.5 text-center mr-3 md:mr-0">
                            <svg v-if="mmLoader" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            Coming Soon
                        </button>
                        <!-- <button @click="mint" type="button" class="mt-4 text-white capitalize bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-4 focus:outline-none focus:ring-invictus-red-300 font-normal rounded-lg text-normal px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-invictus-red-800 dark:hover:bg-invictus-red-600 dark:focus:ring-invictus-red-800">
                            <svg v-if="mmLoader" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            {{ isConnected ? 'Mint' : 'Connect Metamask' }}
                        </button> -->
                        <div class="py-4 flex justify-between text-invictus-gray-200 font-light text-sm">
                            <p>Balance {{ balance ? balance : '--' }}</p>
                            <p>1 Embryo = 0.1 ETH</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel'
    import { ethers } from 'ethers'
    import axios from 'axios'
    import Footer from '@/components/Footer.vue'
    export default {
        data() {
            return {
                isEthereum: false,
                showMinter: false,
                mmLoader: false,
                balance: undefined,
                purchaseAmount: undefined
            }
        },
        methods: {
            async connectMetamask() {
                this.mmLoader = true   
                const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
                const signer = provider.getSigner()
                await provider.send("eth_requestAccounts", []);
                const accounts = await provider.listAccounts()
                try {
                    const signature = await signer.signMessage("Dear Lords! I'm confirming my ownership. (Read-only transaction)")
                    const address = await signer.getAddress()
                    const res = await axios.get('/api/player/isRegisteredPlayer', {
                        params:{
                            signature: signature
                        }
                    }).then(res => {
                        if(res.data.success) {
                            this.$store.dispatch('connect', {signature, address})
                            this.$store.dispatch('fetchProfile')
                        } else {
                            this.$store.dispatch('connect', {signature, address})
                            this.$store.commit('isPlayer', false)
                        }
                    })
                    return res
                } catch(err) {
                    this.mmLoader = false
                } finally {
                    provider.getBalance(this.$store.state.address).then(b => {
                        this.balance = ethers.utils.formatEther(b)
                    })
                    this.mmLoader = false
                }
            },
            mint() {
                if(!this.isConnected) this.connectMetamask()
                else {

                }
            }
        },
        async created() {
            // if(this.isConnected) {
            //     const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
            //     provider.getBalance(this.$store.state.address).then(b => {
            //         this.balance = ethers.utils.formatEther(b)
            //     })
            // } else {
            //     this.connectMetamask()
            // }
            // if(parseInt(window.ethereum.chainId) == 1) {
            //     this.isEthereum = true
            //     console.log(window.ethereum.chainId)
            // } else {
            //     this.isLoading = false
            //     this.isEthereum= false
            // }  
            // window.ethereum.on("chainChanged", async (chainId) => {
            // chainId = parseInt(chainId)
            // if(chainId == 1) {
            //     // this.$store.dispatch('connect')
            //     this.isFantom = true
            //     this.showMinter()
            //     console.log("chainChanged", chainId)
            // } else {
            //     this.isFantom = false
            //     console.log("chainChanged", chainId)
            // }
        },
        components: {
            Carousel,
            Slide,
            Footer
        },
        computed: {
            isConnected() {
                return this.$store.state.address && this.$store.state.address.length > 0 ? true : false
            },
            maxAmount() {
                return this.balance && this.balance !== 0 ? Math.floor(this.balance/0.1) : 0
            }
        }
    }
</script>