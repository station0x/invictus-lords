<template>
    <section class="bg-white dark:bg-invictus-gray-900 px-10 py-16">
        <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-20">
            <div class="grid items-center gap-8 mb-8 lg:mb-16 lg:gap-12 lg:grid-cols-12">
                <div class="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                    <div class="flex justify-center md:justify-start mb-10">
                        <div class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                            <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
                            <img class="ml-2 lg:ml-0 mr-2 h-9" :src="projects[invitedBy]"/>
                            <span class="lg:flex self-center text-xl font-semibold whitespace-nowrap dark:text-white">Station ZeroX</span>
                        </div>
                        <div class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                            <span class="lg:flex self-center text-xl font-semibold whitespace-nowrap dark:text-white">X</span>
                        </div>
                        <div class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                            <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
                            <svg  class="ml-2 lg:ml-0 mr-3 h-9" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.9786 27.976C22 27.8783 22.0118 27.7766 22.0118 27.6723V7.94094C22.0122 7.92828 22.0118 7.91563 22.0118 7.90297V7.89817C22.0118 7.8973 22.0118 7.89686 22.0118 7.89599C22.0113 7.87679 22.0109 7.85759 22.01 7.83839C21.9908 7.35312 21.7377 6.89971 21.3179 6.65184C20.8117 6.35292 20.1933 6.40048 19.7443 6.73694C19.1203 6.98961 18.4587 7.11834 17.7749 7.11965C17.7644 7.11922 17.7543 7.11922 17.7443 7.11922H17.7413C14.8419 7.10569 12.4836 4.73653 12.4836 1.83628C12.4828 1.05383 11.8482 0.418884 11.0654 0.418884C10.4226 0.418884 9.87969 0.846983 9.70601 1.43349C9.63313 1.62899 9.60171 1.84326 9.62309 2.06495C9.79241 3.82229 8.95192 5.60974 7.43023 6.73039C6.69361 7.27283 5.84526 7.63023 4.97728 7.76464C4.13549 7.89468 3.25005 7.69002 2.34105 7.40898C1.94263 7.10176 1.4063 7.02496 0.932819 7.2209C0.402605 7.4404 0.0574205 7.95752 0.0574205 8.53094V8.59814C0.0574205 8.60513 0.0574205 8.61167 0.0574205 8.61865V28.278C0.0552386 28.3858 0.0652755 28.4945 0.0884042 28.6023C0.0884042 28.6027 0.0884042 28.6031 0.0888406 28.6036C0.0927681 28.6215 0.0966956 28.6389 0.101496 28.6568C0.104987 28.6717 0.109351 28.6865 0.113278 28.7013C0.113715 28.7026 0.114151 28.7039 0.114588 28.7057C0.293508 29.3371 0.879143 29.791 1.5682 29.7469C1.82436 29.7303 2.0622 29.6457 2.26337 29.5108C3.88631 28.8401 5.82563 29.0945 7.37612 30.1951C8.96283 31.3214 9.80332 33.0657 9.6244 34.8605C9.54672 35.6395 10.1153 36.3342 10.8943 36.4119C10.9423 36.4167 10.9899 36.4189 11.037 36.4189C11.7566 36.4189 12.3732 35.873 12.4461 35.142C12.4714 34.8898 12.4832 34.6371 12.4832 34.3853C12.4832 34.3757 12.4841 34.3661 12.4841 34.3565C12.4841 32.6105 13.4175 30.9732 14.9807 29.9773C16.5416 28.9828 18.4164 28.8288 19.9961 29.5649C20.7057 29.8957 21.5492 29.5885 21.88 28.8789C22.0157 28.5852 22.0432 28.2693 21.9786 27.976ZM9.11121 9.01359C9.98399 8.37122 10.7088 7.57917 11.26 6.69461C11.4887 6.99965 11.74 7.29116 12.0141 7.56608C13.2678 8.82419 14.862 9.62104 16.5896 9.87022L10.7049 15.7554L5.50051 10.5514C6.78699 10.3376 8.03332 9.80738 9.11121 9.01359ZM13.4559 27.5855C12.4793 28.2078 11.6641 28.9998 11.0418 29.9049C10.495 29.132 9.80899 28.4447 9.01651 27.8822C7.86226 27.0631 6.52778 26.5381 5.15664 26.364C4.39645 26.2676 3.63451 26.2824 2.89265 26.4033V11.9597C2.89265 11.9575 2.89527 11.9562 2.89701 11.9579L8.69969 17.7606L5.22253 21.2377C4.66003 21.8003 4.66919 22.7175 5.24915 23.2687C5.81035 23.8015 6.70277 23.7671 7.25 23.2198L10.7049 19.7658L14.1633 23.2242C14.7171 23.778 15.6147 23.778 16.1685 23.2242C16.7223 22.6704 16.7223 21.7728 16.1685 21.219L12.7101 17.7606L19.1722 11.2985C19.1739 11.2968 19.1765 11.2981 19.1765 11.3003V26.3723C17.2429 26.0537 15.2111 26.467 13.4559 27.5855Z" fill="#F21111"/>
                            </svg>
                            <span class="lg:flex self-center text-xl font-semibold whitespace-nowrap dark:text-white">Invictus Lords</span>
                        </div>
                    </div>
                    <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        You're here because <span class="text-invictus-red-900"> You're special </span> for us </h1>
                    <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                        You were invited by <span class="text-invictus-red-900 capitalize">{{ invitedBy }}</span> to be enrolled in our governance token airdrop system by registering through this page.
                    </p>
                    <button v-if="!$store.state.address" @click="auth" type="button" class="text-gray-900 bg-white hover:bg-invictus-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-light rounded-lg text-normal px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-invictus-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-invictus-gray-700 mr-2 mb-2">
                        <svg v-if="steamLoader" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        <svg v-else aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_13748_71727)">
                        <path d="M10.6312 0.222229C5.40921 0.222229 1.13123 4.20401 0.724716 9.26423L6.05281 11.4427C6.50427 11.1373 7.04966 10.9585 7.6364 10.9585C7.68899 10.9585 7.74135 10.9607 7.79326 10.9631L10.1627 7.5669C10.1627 7.55067 10.1627 7.5349 10.1627 7.5189C10.1627 5.47467 11.8443 3.81156 13.9117 3.81156C15.9789 3.81156 17.6604 5.47467 17.6604 7.5189C17.6604 9.56312 15.9789 11.2265 13.9117 11.2265C13.8831 11.2265 13.8548 11.2265 13.8265 11.2242L10.4472 13.6087C10.4494 13.652 10.4506 13.6962 10.4506 13.7402C10.4506 15.2749 9.18831 16.5229 7.63663 16.5229C6.2746 16.5229 5.13573 15.5616 4.87775 14.2885L1.06719 12.7316C2.24696 16.8578 6.08045 19.8829 10.6312 19.8829C16.1216 19.8829 20.5721 15.4816 20.5721 10.0529C20.5721 4.62334 16.1213 0.222229 10.6312 0.222229" fill="white"/>
                        <path d="M6.95416 15.1382L5.73303 14.6393C5.94944 15.0849 6.32382 15.458 6.8209 15.6629C7.8955 16.1056 9.13438 15.6013 9.58225 14.5378C9.7991 14.0236 9.80045 13.4558 9.58539 12.9402C9.37079 12.4244 8.96584 12.0222 8.44517 11.8076C7.92854 11.5949 7.37505 11.6027 6.88876 11.7842L8.15011 12.3C8.9427 12.6267 9.31753 13.5267 8.98719 14.3104C8.65753 15.0944 7.74674 15.4651 6.95416 15.1382" fill="#FBFBFB"/>
                        <path d="M16.4092 7.51889C16.4092 6.15689 15.2888 5.04867 13.9112 5.04867C12.5339 5.04867 11.4133 6.15689 11.4133 7.51889C11.4133 8.88111 12.5339 9.98889 13.9112 9.98889C15.2888 9.98889 16.4092 8.88089 16.4092 7.51889ZM12.0389 7.51467C12.0389 6.48978 12.8791 5.65911 13.9155 5.65911C14.9519 5.65911 15.7921 6.48978 15.7921 7.51467C15.7921 8.53956 14.9519 9.37022 13.9155 9.37022C12.8791 9.37022 12.0389 8.53933 12.0389 7.51467" fill="#FBFBFB"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_13748_71727">
                        <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        Sign up with Steam
                    </button>
                    <p class="max-w-xl mx-auto my-3 font-light text-gray-700 lg:mx-0 xl:mb-8 text-sm md:text-sm xl:text-sm dark:text-gray-400">
                    You need to Signup from this page to be eligible for the airdrop system 
                    </p>
            
                </div>
                <div class="flex col-span-6 align-middle justify-center">
                    <img src="/img/ready-for-action-man.png" class="dark:hidden" alt="mockup">
                    <img src="/img/ready-for-action-man.png" class="hidden dark:block" alt="mockup dark">
                </div>
            </div>
            <div class="grid gap-8 sm:gap-12 md:grid-cols-3">
                <div class="flex justify-center">
                    <svg class="w-8 h-8 mr-3 text-invictus-red-900 dark:text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <div>
                        <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Track your in-game progress</h3>
                        <p class="font-light text-gray-500 dark:text-gray-400">Invictus Lords tracks your progress using game provider APIs; No software required, no extra steps. Relax, play and come back to check your progress.</p>
                    </div>
                </div>
                <div class="flex justify-center">
                <svg class="w-8 h-8 mr-3 text-invictus-red-900 dark:text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <div>
                        <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Compete with others</h3>
                        <p class="font-light text-gray-500 dark:text-gray-400">Obtain your place in leaderboard by competing, higher ranking means more rewards.</p>
                    </div>
                </div>
                <div class="flex justify-center">
                <svg class="w-8 h-8 mr-3 text-invictus-red-900 dark:text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    <div>
                        <h3 class="mb-1 text-lg font-semibold leading-tight text-gray-900 dark:text-white">Claim your rewards daily</h3>
                        <p class="font-light text-gray-500 dark:text-gray-400">100,000 VON rewards are distributed daily among the leaderboards of all games. Players can redeem their rewards on the Ethereum network via Metamask.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </template>
    
<script>
    import axios from 'axios'
    export default {
    data() {
        return {
            steamLoader: false,
            projects: {
                // 'concave' : 'hello',
                'station0x' : '/img/partners/station0x.png'
            },
            invitedBy: undefined
        }
    },
    methods: {
        async auth() {
            this.$store.dispatch('registerAirdropCandidate', this.invitedBy)
            this.steamLoader = true;
            const res = await axios.get("/api/auth/steam/getRedirect", {})
                .then(res => window.open(res.data.redirectUrl, "_self"))
                .finally(this.steamLoader = true)
            return res;
        }
    },
    created() {
        if(this.projects[this.$route.params.project]) {
            this.invitedBy = this.$route.params.project
        } else this.$router.push('/')
    }
    }
</script>

<style scoped>

</style>
    