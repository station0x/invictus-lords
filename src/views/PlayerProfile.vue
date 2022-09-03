<template>
    <div>
        <Loader v-if="fetchingProfileLoader"/>
        <div v-else class="profile-wrapper">
            <ProfileBox/>
        </div>
    </div>
</template>

<script>
    import ProfileBox from '@/components/SVGs/ProfileBox.vue'
    import Loader from '@/components/Loader.vue'
    import { ethers } from 'ethers'
    import axios from 'axios'
    export default {
        data() {
            return {
                fetchingProfileLoader: true,
                playerProfile: undefined,
                player:undefined
            }
        },
        methods: {
            async fetchProfile(address) {
                try {
                    const res = await axios.get('/api/player/fetchPlayerProfile', {
                        params:{
                            address
                        }
                    })
                    this.playerProfile = res.data.playerDoc
                } catch(err) {
                    if(!err.response.data.success) this.$router.push('/')
                }
            },
            async fetchCSGO() {
                const res = await axios.get('https://public-api.tracker.gg/v2/csgo/standard/profile/steam/76561198008049283', {
                    headers: {
                        'TRN-Api-Key': import.meta.env.VITE_TRACKER_API,
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                this.player = res.data
            }
        },
        components: {
            ProfileBox,
            Loader
        },
        async created() {
            if(ethers.utils.isAddress(this.$route.params.playerAddress)) {
                await this.fetchProfile(this.$route.params.playerAddress)
                this.fetchingProfileLoader = false

                // await this.fetchCSGO()
            } else {
                this.$router.push({ name: 'Home' })
            }
        }
    }
</script>

<style>
    .profile-wrapper {
        position: absolute;
        top: calc(13vh);
        left: 50%;
        transform: translate(-50%, 0vh);
        text-align: center;
        width: 80vw;
        max-width: 1400px;
        min-width: 1100px;
    }
    /* .profile-box {
        width: 80%;
    } */
</style>