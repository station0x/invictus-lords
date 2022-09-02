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
                playerInfo: undefined
            }
        },
        methods: {
            async fetchProfile() {
                const res = await axios.get('/api/player/fetchPlayerProfile', {
                    params:{
                        address: this.playerAddress
                    }
                })
                this.playerInfo = res.data.playerDoc
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
                this.isAddress = true
                this.playerAddress = this.$route.params.playerAddress
                const playerProfile = await this.fetchProfile()
                const fetchCSGO = await this.fetchCSGO()
                this.fetchingProfileLoader = false
            } else {
                this.$router.push({ name: 'Not found', params: {message: 'Profile'} })
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
    }
    /* .profile-box {
        width: 80%;
    } */
</style>