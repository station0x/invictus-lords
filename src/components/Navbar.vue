<template>
    <div>
        <!-- <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-invictus-gray-900 fixed w-full z-20 top-0 left-0 border-b border-invictus-gray-200 dark:border-invictus-gray-600">
            <div class="container flex flex-wrap justify-between items-center mx-auto">
            <a href="https://flowbite.com/" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div class="flex md:order-2">
                <button type="button" class="text-white bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-4 focus:outline-none focus:ring-invictus-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-invictus-red-600 dark:hover:bg-invictus-red-600 dark:focus:ring-invictus-red-800">Get started</button>
                <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                </li>
                <li>
                    <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                </li>
                <li>
                    <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
                </ul>
            </div>
            </div>
        </nav> -->
        <header>
            <nav :class=" (isApp && isConnected) ? 'px-4 lg:px-5' : 'px-4 lg:px-6'" class="bg-white fixed w-full py-4 z-20 dark:bg-invictus-gray-900 border-b border-invictus-gray-200 dark:border-invictus-gray-700">
                <div class="grid grid-cols-2 items-center mx-auto" :class=" (isApp && isConnected) ? '' : 'max-w-screen-xl'">
                    <!-- <a href="https://flowbite.com" class="flex items-center lg:justify-center lg:order-2">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a> -->
                    <div v-if="!isConnected" class="flex col-span-2 justify-end items-center lg:order-3 lg:col-span-1">
                        <a @click="auth" class="cursor-pointer text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 dark:border-invictus-gray-100 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            <svg v-if="authLoader" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            {{ authLoader ? 'Opening Steam' : 'Signup with Steam' }}</a>
                        <!-- <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Sign up</a> -->
                        <button @click="connectMetamask" type="button" class="text-white bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-4 focus:outline-none focus:ring-invictus-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-invictus-red-600 dark:hover:bg-invictus-red-600 dark:focus:ring-invictus-red-800">
                            <svg v-if="mmLoader" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            {{ mmLoader ? 'Connecting..' : 'Connect Metamask' }}</button>

                        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <button v-else @click="toggleDropdown" id="userDropdownBtn" data-dropdown-toggle="dropdownAvatarName" type="button" class="flex col-span-2 justify-end items-center lg:order-3 lg:col-span-1 p-2 text-sm text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Open user menu</span>
                        <img class="mr-2 w-8 h-8 rounded-full" :src="$store.state.profile.avatar" alt="user photo">
                         {{ $store.state.profile.playerAlias }}
                        <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <!-- Dropdown menu -->
                    <div id="userDropdownMenu" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
                        <div class="font-medium ">Pro User</div>
                        <div class="truncate">name@flowbite.com</div>
                        </div>
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        </ul>
                        <div class="py-1">
                        <a href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                        </div>
                    </div>
         <!-- <div class="col-span-3 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 lg:col-span-1">
                        <a @click="$router.push('/')" class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Invictus Lords</span>
                        </a>
                    </div> -->
                    <div class="hidden col-span-3 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 lg:col-span-1" id="mobile-menu-2">
                        <ul class="flex flex-col mt-4 font-medium space-x-8 lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a @click="$router.push('/')" class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                                    <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
                                    <svg  class="mr-3 h-6 sm:h-9" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.9786 27.976C22 27.8783 22.0118 27.7766 22.0118 27.6723V7.94094C22.0122 7.92828 22.0118 7.91563 22.0118 7.90297V7.89817C22.0118 7.8973 22.0118 7.89686 22.0118 7.89599C22.0113 7.87679 22.0109 7.85759 22.01 7.83839C21.9908 7.35312 21.7377 6.89971 21.3179 6.65184C20.8117 6.35292 20.1933 6.40048 19.7443 6.73694C19.1203 6.98961 18.4587 7.11834 17.7749 7.11965C17.7644 7.11922 17.7543 7.11922 17.7443 7.11922H17.7413C14.8419 7.10569 12.4836 4.73653 12.4836 1.83628C12.4828 1.05383 11.8482 0.418884 11.0654 0.418884C10.4226 0.418884 9.87969 0.846983 9.70601 1.43349C9.63313 1.62899 9.60171 1.84326 9.62309 2.06495C9.79241 3.82229 8.95192 5.60974 7.43023 6.73039C6.69361 7.27283 5.84526 7.63023 4.97728 7.76464C4.13549 7.89468 3.25005 7.69002 2.34105 7.40898C1.94263 7.10176 1.4063 7.02496 0.932819 7.2209C0.402605 7.4404 0.0574205 7.95752 0.0574205 8.53094V8.59814C0.0574205 8.60513 0.0574205 8.61167 0.0574205 8.61865V28.278C0.0552386 28.3858 0.0652755 28.4945 0.0884042 28.6023C0.0884042 28.6027 0.0884042 28.6031 0.0888406 28.6036C0.0927681 28.6215 0.0966956 28.6389 0.101496 28.6568C0.104987 28.6717 0.109351 28.6865 0.113278 28.7013C0.113715 28.7026 0.114151 28.7039 0.114588 28.7057C0.293508 29.3371 0.879143 29.791 1.5682 29.7469C1.82436 29.7303 2.0622 29.6457 2.26337 29.5108C3.88631 28.8401 5.82563 29.0945 7.37612 30.1951C8.96283 31.3214 9.80332 33.0657 9.6244 34.8605C9.54672 35.6395 10.1153 36.3342 10.8943 36.4119C10.9423 36.4167 10.9899 36.4189 11.037 36.4189C11.7566 36.4189 12.3732 35.873 12.4461 35.142C12.4714 34.8898 12.4832 34.6371 12.4832 34.3853C12.4832 34.3757 12.4841 34.3661 12.4841 34.3565C12.4841 32.6105 13.4175 30.9732 14.9807 29.9773C16.5416 28.9828 18.4164 28.8288 19.9961 29.5649C20.7057 29.8957 21.5492 29.5885 21.88 28.8789C22.0157 28.5852 22.0432 28.2693 21.9786 27.976ZM9.11121 9.01359C9.98399 8.37122 10.7088 7.57917 11.26 6.69461C11.4887 6.99965 11.74 7.29116 12.0141 7.56608C13.2678 8.82419 14.862 9.62104 16.5896 9.87022L10.7049 15.7554L5.50051 10.5514C6.78699 10.3376 8.03332 9.80738 9.11121 9.01359ZM13.4559 27.5855C12.4793 28.2078 11.6641 28.9998 11.0418 29.9049C10.495 29.132 9.80899 28.4447 9.01651 27.8822C7.86226 27.0631 6.52778 26.5381 5.15664 26.364C4.39645 26.2676 3.63451 26.2824 2.89265 26.4033V11.9597C2.89265 11.9575 2.89527 11.9562 2.89701 11.9579L8.69969 17.7606L5.22253 21.2377C4.66003 21.8003 4.66919 22.7175 5.24915 23.2687C5.81035 23.8015 6.70277 23.7671 7.25 23.2198L10.7049 19.7658L14.1633 23.2242C14.7171 23.778 15.6147 23.778 16.1685 23.2242C16.7223 22.6704 16.7223 21.7728 16.1685 21.219L12.7101 17.7606L19.1722 11.2985C19.1739 11.2968 19.1765 11.2981 19.1765 11.3003V26.3723C17.2429 26.0537 15.2111 26.467 13.4559 27.5855Z" fill="#F21111"/>
                                    </svg>
                                    <span v-if="!isConnected" class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Invictus Lords</span>
                                </a>
                            </li>
                            <li v-if="!isConnected">
                                <a href="#" @click="$router.push('/')" v-if="$route.name === 'Home'" class="block mt-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Home</a>
                                <a href="#" @click="$router.push('/')" v-else class="block mt-2 py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                            </li>
                            <li v-if="!isConnected">
                                <a href="#" @click="$router.push('/ecosystem')" v-if="$route.name === 'Ecosystem'" class="block mt-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Ecosystem</a>
                                <a href="#" @click="$router.push('/ecosystem')" v-else class="block mt-2 py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ecosystem</a>
                            </li>
                            <li v-if="!isConnected">
                                <a href="#" @click="$router.push('/minting')" v-if="$route.name === 'Minting'" class="block mt-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Minting</a>
                                <a href="#" @click="$router.push('/minting')" v-else class="block mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Minting</a>
                            </li>
                            <li v-if="!isConnected">
                                <a href="#" @click="$router.push('/leaderboard')" v-if="$route.name === 'Leaderboard'" class="block mt-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Leaderboard</a>
                                <a href="#" @click="$router.push('/leaderboard')" v-else class="block mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Leaderboard</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
    import { ethers } from 'ethers'
    import axios from 'axios'
    import Loader from '@/components/Loader.vue'
    import detectEthereumProvider from '@metamask/detect-provider'
    import dev from '../../constants/dev.json'
    import prod from '../../constants/prod.json'
    import { serializeError } from "eth-rpc-errors"
    const CONSTANTS = import.meta.env.VITE_APP_ENV === prod ? prod : dev
    export default {
        data() {
            return {
                authLoader: false,
                mmLoader: false,
                mmInstalled: false,
                claiming: false,
                isDropdownOpen: false
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
            toggleDropdown() {
                // dropdown logic
                // set the dropdown menu element
                const targetEl = document.getElementById('userDropdownBtn');

                // set the element that trigger the dropdown menu on click
                const triggerEl = document.getElementById('userDropdownMenu');

                // options with default values
                const options = {
                placement: 'bottom',
                onHide: () => {
                    console.log('dropdown has been hidden');
                },
                onShow: () => {
                    console.log('dropdown has been shown');
                }
                };
                const dropdown = new Dropdown(targetEl, triggerEl, options)
                if(this.isDropdownOpen) dropdown.hide()
                else dropdown.show()
            },
            logout() {
                this.$store.dispatch('disconnect')
                // this.$router.push({name: 'Home'})
                // this.$emit('close')
            },
            async claimAllRewards(amount) {
                console.log(amount)
                if(this.rewardsFormatted === 0) return false
                this.claiming = true
                try {
                    window.ethereum.request({ method: "eth_requestAccounts" })
                    // window.ethereum.enable()
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
                        let res
                        if(!amount) {
                            res = await axios.get('/api/rewards/claimAllRewards', {
                                params:{
                                    signature: this.$store.state.signature
                                }
                            })
                        } else {
                            res = await axios.get('/api/rewards/claimRewardsWithAmount', {
                                params:{
                                    signature: this.$store.state.signature,
                                    amount
                                }
                            })
                        }
                        console.log(res.data.signature)
                        const signature = ethers.utils.splitSignature(res.data.signature)
                        console.log(signature)
                        const MinterContract = new ethers.Contract(CONSTANTS.economicPolicy.minter, 
                        ["function mint(uint _amount, uint nonce, uint8 _v, bytes32 _r, bytes32 _s)",
                        "function getAllowedDailyMint() view returns (uint)",
                        "function UserClaimed(address) view returns (uint)",
                        "function DailyMinted(uint) view returns (uint)"],
                        signer);
                        try {
                            console.log('amount ', amount, typeof amount)
                            console.log('claimable ', res.data.claimableRewards, typeof res.data.claimableRewards)
                            const claimAmount = amount ?
                            ethers.utils.parseEther(amount.toString()) : 
                            ethers.utils.parseEther(res.data.claimableRewards.toString());
                            console.log(claimAmount)
                            console.log(Number(ethers.utils.formatEther(claimAmount)))
                            const tx = await MinterContract.mint(
                                claimAmount,
                                res.data.nonce,
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
                                position: 'is-top'
                            })
                        } catch(err) {
                            console.log(serializeError(err))
                            if((serializeError(err).code === -32603)) {
                                const message = serializeError(err).data.originalError.reason != "execution reverted: Amounts exceeds daily minting limit" ? 
                                serializeError(err).data.originalError.reason : 
                                serializeError(err).data.originalError.reason.split(':')[1]
                                const withdrawablAmnt = Number(ethers.utils.formatEther(await MinterContract.getAllowedDailyMint()))
                                const today = Number.parseInt(((Date.now() / 1000) / 86400).toString().split('.')[0])
                                const DailyMinted = Number(ethers.utils.formatEther(await MinterContract.DailyMinted(today)))
                                const MaxAmount = this.$store.state.profile.rewards < withdrawablAmnt ? this.$store.state.profile.rewards : withdrawablAmnt
                                this.$buefy.dialog.prompt({
                                    title: message,
                                    message: `The daily maximum VON amount to be minted is ${CONSTANTS.economicPolicy.dailyRewards.toLocaleString()} VON. Other players minted ${DailyMinted.toLocaleString()} VON. You can mint up to ${withdrawablAmnt.toLocaleString()} VON.`,
                                    type: 'is-danger',
                                    inputAttrs: {
                                        placeholder: 'e.g. Walter',
                                        maxlength: 10,
                                        max: MaxAmount,
                                        value: withdrawablAmnt,
                                        required: true,
                                    },
                                    trapFocus: true,
                                    confirmText: 'Try Again',
                                    onConfirm: (value) => this.claimAllRewards(Number.parseInt(value))
                                })
                            } else {
                                this.$buefy.toast.open('Error occurred! Try again.')
                            }
                        }
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
            async auth() {
                this.authLoader = true;
                const res = await axios.get("/api/auth/steam/getRedirect", {})
                    .then(res => window.open(res.data.redirectUrl, "_self"))
                    .finally(this.steamLoader = true);
                return res;
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
                            this.$buefy.toast.open('Welcome back my Lord!')
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
            openMinting() {
                this.$router.push('minting')
            },
            formatName(name) {
                if(this.$store.state.address) return name.slice(0, 11) + ' ..'
                return '--'
            },
            handleScroll () {
                this.$store.commit('setScrollY', window.scrollY)
            }
        },
        async beforeMount() {
            if(this.$store.state.address) {
                this.$store.dispatch('fetchProfile')
                setTimeout(() => {
                    if(!this.$store.state.profile) this.$store.dispatch('disconnect')
                }, 15000)
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
                return this.$store.state.scrollY > 50;
            },
            userBalance() {
                return this.$store.state.inventory.length > 0 ? this.$store.state.inventory[0].balance : '--'
            },
            isApp() {
                return (this.$route.name !== 'Home'
                && this.$route.name !== 'Ecosystem'
                && this.$route.name !== 'Minting')
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
.total-rewards:hover .claim-btn {
    opacity: 0.9;
    color: red; 
}
.total-rewards:hover .claim-btn.disabled  {
    color: grey;
    opacity: 0.6;
}
.claim-btn {
    color: red; 
    float: right; 
    right: -18px;
    font-size: 16px;
    top: 0px;
    float: right;
    position: absolute;
    background: rgb(0,0,0);
    background: -moz-radial-gradient(circle, rgba(0,0,0,1) 43%, transparent 95%);
    background: -webkit-radial-gradient(circle, rgba(0,0,0,1) 43%, transparent 95%);
    background: radial-gradient(circle, rgba(0,0,0,1) 43%, transparent 95%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="transparent",GradientType=1);
    padding: 0 30px 0px 30px;
    transition: all ease-out 300ms;
}
.claim-btn.disabled {
    color: grey;
    opacity: 0.6;
    cursor: not-allowed;
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
    top: -3px;
}
.elementToFadeInAndOut {
    /* background: transparent; */
    -webkit-animation: fadeinout 1s linear forwards;
    animation: fadeinout 1s linear forwards;
    animation-iteration-count: infinite;
    /* left: -5px; */
    font-size: 17px;
}
@keyframes fadeinout {
    0%,100% { opacity: 0 }
    50% { opacity: 1 }
}
.media-content {
    color: red !important;
}
.modal-card-title {
    color: red !important;
    font-size: 19px !important;
}
.media-content {
    padding-top: 3px;
    color: white !important;
}
input.input {
    border: 2px solid grey !important;
    border-radius: 5px !important;
}
</style>