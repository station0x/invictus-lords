<template>
    <div>
        <header class="z-[1000] flex h-16 w-full items-center justify-between border-b border-invictus-gray-700 pl-0 pr-5">
            <!-- Dropdown menu -->
            <div :class="isDropdownOpen ? '' : 'hidden'" class="absolute right-5 top-[65px] z-10 w-[290px] border border-invictus-gray-600 bg-white rounded divide-y divide-invictus-gray-100 shadow dark:bg-invictus-gray-700 dark:divide-invictus-gray-600">
                <div @click="zeroClicks" class="flex py-4 px-2 text-sm text-invictus-gray-900 dark:text-white">
                    <img class="mt-0 ml-1 mr-2 w-10 h-10 rounded-full" :src="playerAvatar" alt="">
                    <span class="relative -top-[3px] right-4 h-3 w-3">
                        <span class="animate-ping absolute top-[5px] inline-flex h-2.5 w-2.5 rounded-full bg-[#99d52a] opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#99d52a]"></span>
                    </span>
                    <div class="font-medium dark:text-white -ml-2 -mt-1">
                        <div class="capitalize text-base"> {{ playerAlias }} 
                        </div>
                        <div class="mt-[3px] text-sm uppercase text-gray-500 dark:text-gray-400"> {{ lordAddress }}
                            <button @click="openScanner" type="button" class="absolute right-0 text-invictus-gray-700 border border-invictus-gray-700 hover:bg-invictus-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-invictus-gray-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:border-invictus-gray-500 dark:text-invictus-gray-300 dark:hover:text-white dark:focus:ring-invictus-gray-800">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                <li>
                    <a @click="openProfile" class="cursor-pointer block py-2 px-4 hover:bg-invictus-gray-100 dark:hover:bg-invictus-gray-600 dark:hover:text-white">Profile</a>
                </li>
                <li>
                    <a @click="logout" class="cursor-pointer block py-2 px-4 hover:bg-invictus-gray-100 dark:hover:bg-invictus-gray-600 dark:hover:text-white">
                        Logout</a>
                </li>
                </ul>
            </div>
            <nav :class=" (isApp && isConnected) ? 'px-4 lg:px-5' : 'px-4 lg:px-6'" class="flex items-center sm:pl-2 bg-white py-2 z-20 dark:bg-invictus-gray-900">
                <div class="grid items-center mx-auto" :class=" (isApp && isConnected) ? '' : 'max-w-screen-xl'">
                    <!-- <a href="https://flowbite.com" class="flex items-center lg:justify-center lg:order-2">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a> -->
         <!-- <div class="col-span-3 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 lg:col-span-1">
                        <a @click="$router.push('/')" class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                            <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Invictus Lords</span>
                        </a>
                    </div> -->
                    <nav>
                        <div class="col-span-3 justify-between items-center w-full lg:flex lg:w-auto lg:order-1 lg:col-span-1" id="mobile-menu-2">
                            <ul class="flex mt-0 font-medium space-x-8 lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <a @click="$router.push('/')" class="flex mr-8 items-left lg:justify-left lg:order-1 cursor-pointer">
                                        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
                                        <svg  class="mr-3 h-6 sm:h-9" viewBox="0 0 22 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.9786 27.976C22 27.8783 22.0118 27.7766 22.0118 27.6723V7.94094C22.0122 7.92828 22.0118 7.91563 22.0118 7.90297V7.89817C22.0118 7.8973 22.0118 7.89686 22.0118 7.89599C22.0113 7.87679 22.0109 7.85759 22.01 7.83839C21.9908 7.35312 21.7377 6.89971 21.3179 6.65184C20.8117 6.35292 20.1933 6.40048 19.7443 6.73694C19.1203 6.98961 18.4587 7.11834 17.7749 7.11965C17.7644 7.11922 17.7543 7.11922 17.7443 7.11922H17.7413C14.8419 7.10569 12.4836 4.73653 12.4836 1.83628C12.4828 1.05383 11.8482 0.418884 11.0654 0.418884C10.4226 0.418884 9.87969 0.846983 9.70601 1.43349C9.63313 1.62899 9.60171 1.84326 9.62309 2.06495C9.79241 3.82229 8.95192 5.60974 7.43023 6.73039C6.69361 7.27283 5.84526 7.63023 4.97728 7.76464C4.13549 7.89468 3.25005 7.69002 2.34105 7.40898C1.94263 7.10176 1.4063 7.02496 0.932819 7.2209C0.402605 7.4404 0.0574205 7.95752 0.0574205 8.53094V8.59814C0.0574205 8.60513 0.0574205 8.61167 0.0574205 8.61865V28.278C0.0552386 28.3858 0.0652755 28.4945 0.0884042 28.6023C0.0884042 28.6027 0.0884042 28.6031 0.0888406 28.6036C0.0927681 28.6215 0.0966956 28.6389 0.101496 28.6568C0.104987 28.6717 0.109351 28.6865 0.113278 28.7013C0.113715 28.7026 0.114151 28.7039 0.114588 28.7057C0.293508 29.3371 0.879143 29.791 1.5682 29.7469C1.82436 29.7303 2.0622 29.6457 2.26337 29.5108C3.88631 28.8401 5.82563 29.0945 7.37612 30.1951C8.96283 31.3214 9.80332 33.0657 9.6244 34.8605C9.54672 35.6395 10.1153 36.3342 10.8943 36.4119C10.9423 36.4167 10.9899 36.4189 11.037 36.4189C11.7566 36.4189 12.3732 35.873 12.4461 35.142C12.4714 34.8898 12.4832 34.6371 12.4832 34.3853C12.4832 34.3757 12.4841 34.3661 12.4841 34.3565C12.4841 32.6105 13.4175 30.9732 14.9807 29.9773C16.5416 28.9828 18.4164 28.8288 19.9961 29.5649C20.7057 29.8957 21.5492 29.5885 21.88 28.8789C22.0157 28.5852 22.0432 28.2693 21.9786 27.976ZM9.11121 9.01359C9.98399 8.37122 10.7088 7.57917 11.26 6.69461C11.4887 6.99965 11.74 7.29116 12.0141 7.56608C13.2678 8.82419 14.862 9.62104 16.5896 9.87022L10.7049 15.7554L5.50051 10.5514C6.78699 10.3376 8.03332 9.80738 9.11121 9.01359ZM13.4559 27.5855C12.4793 28.2078 11.6641 28.9998 11.0418 29.9049C10.495 29.132 9.80899 28.4447 9.01651 27.8822C7.86226 27.0631 6.52778 26.5381 5.15664 26.364C4.39645 26.2676 3.63451 26.2824 2.89265 26.4033V11.9597C2.89265 11.9575 2.89527 11.9562 2.89701 11.9579L8.69969 17.7606L5.22253 21.2377C4.66003 21.8003 4.66919 22.7175 5.24915 23.2687C5.81035 23.8015 6.70277 23.7671 7.25 23.2198L10.7049 19.7658L14.1633 23.2242C14.7171 23.778 15.6147 23.778 16.1685 23.2242C16.7223 22.6704 16.7223 21.7728 16.1685 21.219L12.7101 17.7606L19.1722 11.2985C19.1739 11.2968 19.1765 11.2981 19.1765 11.3003V26.3723C17.2429 26.0537 15.2111 26.467 13.4559 27.5855Z" fill="#F21111"/>
                                        </svg>
                                        <span v-if="!isConnected" class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Invictus Lords</span>
                                    </a>
                                </li>
                                <li v-if="!isConnected || !isApp" >
                                    <a @click="$router.push('/')" v-if="$route.name === 'Home'" class="cursor-pointer block mt-2 py-2 pr-4 pl-1 text-white bg-invictus-gray-700 rounded md:bg-transparent md:text-invictus-gray-700 md:p-0 dark:text-white">Home</a>
                                    <a @click="$router.push('/')" v-else class="cursor-pointer block mt-2 py-2 pr-4 pl-1 text-gray-700 rounded hover:bg-invictus-gray-100 md:hover:bg-transparent md:hover:text-invictus-gray-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-invictus-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
                                </li>
                                <li v-if="!isConnected || !isApp" >
                                    <a @click="$router.push('/ecosystem')" v-if="$route.name === 'Ecosystem'" class="cursor-pointer block mt-2 py-2 pr-4 pl-3 text-white bg-invictus-gray-700 rounded md:bg-transparent md:text-invictus-gray-700 md:p-0 dark:text-white">Ecosystem</a>
                                    <a @click="$router.push('/ecosystem')" v-else class="cursor-pointer block mt-2 py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-invictus-gray-100 md:hover:bg-transparent md:hover:text-invictus-gray-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-invictus-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ecosystem</a>
                                </li>
                                <li v-if="!isConnected || !isApp" >
                                    <a @click="$router.push('/minting')" v-if="$route.name === 'Minting'" class="cursor-pointer block mt-2 py-2 pr-4 pl-3 text-white bg-invictus-gray-700 rounded md:bg-transparent md:text-invictus-gray-700 md:p-0 dark:text-white">Minting</a>
                                    <a @click="$router.push('/minting')" v-else class="cursor-pointer block mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-invictus-gray-100 md:hover:bg-transparent md:hover:text-invictus-gray-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-invictus-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Minting</a>
                                </li>
                                <li v-if="!isConnected || !isApp" >
                                    <a @click="$router.push('/leaderboard')" v-if="$route.name === 'Leaderboard'" class="cursor-pointer block mt-2 py-2 pr-4 pl-3 text-white bg-invictus-gray-700 rounded md:bg-transparent md:text-invictus-gray-700 md:p-0 dark:text-white">Leaderboard</a>
                                    <a @click="$router.push('/leaderboard')" v-else class="cursor-pointer block mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-invictus-gray-100 md:hover:bg-transparent md:hover:text-invictus-gray-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-invictus-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Leaderboard</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </nav>
            
            <nav class="hidden items-center space-x-3 lg:flex">
                        <div v-if="!isConnected" class="flex col-span-2 whitespace-nowrap justify-end items-center lg:order-3 lg:col-span-1">
                            <a @click="auth" class="cursor-pointer text-gray-800 dark:text-white hover:bg-invictus-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 lg:py-2.5 mr-2 dark:border-invictus-gray-100 dark:hover:bg-invictus-gray-700 focus:outline-none dark:focus:ring-gray-800">
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

                            <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-invictus-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-invictus-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </nav>
            <nav v-if="isConnected" class="hidden items-center space-x-3 lg:flex">
                <!-- <button type="button" class="flex col-span-2 justify-end items-center lg:order-3 lg:col-span-1 p-2 text-sm text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-invictus-gray-100 dark:bg-invictus-gray-700 dark:hover:bg-invictus-gray-700 dark:hover:text-white">
                    <span class="sr-only">Open user menu</span>
                    <img class="mr-2 w-8 h-8 rounded-full" :src="$store.state.profile.avatar" alt="user photo">
                        <p class="text-white text-base capitalize font-normal">{{ $store.state.profile.playerAlias.slice(0,9) + '...' }}</p>
                    <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button> -->
                <button type="button" class="py-2 ml-5 mr-1.5 flex col-span-2 justify-around items-center lg:order-3 lg:col-span-1 p-2 text-sm text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-invictus-gray-100 dark:bg-invictus-gray-700 dark:hover:bg-invictus-gray-700 dark:hover:text-white">
                    <span class="sr-only">Open user menu</span>
                    <img class="mr-2 w-6 h-6 rounded-full" src="/img/von-token.png" alt="user photo">
                        <p class="text-white text-sm capitalize font-light mr-1">{{ userBalance.toLocaleString() }} </p>
                </button>
                <form class="cursor-default mr-5">   
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <img class="w-6 h-6" src="/img/von-reward.png"/>
                        </div>
                        <input type="search" :value="rewardsFormatted" readonly class="flex col-span-2 justify-around items-center lg:order-3 lg:col-span-1 cursor-default p-4 pl-10 h-11  text-sm text-gray-900 bg-invictus-gray-50 rounded-lg border border-gray-300 focus:ring-invictus-gray-500 focus:border-invictus-gray-500 dark:bg-invictus-gray-900 dark:border-invictus-gray-600 dark:text-white dark:focus:ring-invictus-gray-500">
                        <button @click="claimAllRewards()" :class="rewardsFormatted === (0).toString() || rewardsFormatted === 0 ? 'cursor-default opacity-30' : ''" type="button" class="text-white absolute right-1 bottom-1 bg-invictus-gray-700 hover:bg-invictus-gray-600 focus:ring-0 focus:outline-none focus:ring-invictus-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-invictus-gray-700 dark:hover:bg-invictus-gray-600 dark:focus:ring-invictus-gray-800">
                            <svg v-if="claiming" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>{{ claimingText }}
                        </button>
                    </div>
                </form>
                <button @click="toggleDropdown" type="button" class="min-w-[179px] py-2 flex col-span-2 justify-end items-center lg:order-3 lg:col-span-1 p-2 text-sm text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-invictus-gray-100 dark:bg-invictus-gray-700 dark:hover:bg-invictus-gray-700 dark:hover:text-white">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-6 h-6 mr-2 rounded-full" :src="playerAvatar" alt="user photo">
                        <p class="text-white text-sm capitalize font-normal">{{ playerAlias.slice(0,13) + '...' }}</p>
                    <svg :class="isDropdownOpen ? 'rotate-180' : ''" class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </nav>
        </header>
        <!-- toast -->
        <div v-if="toastUp" class="flex fixed top-5 z-50 w-screen mx-auto items-end justify-center">
            <div id="toast-danger" class="mb-16 flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-invictus-gray-700 border dark:border-invictus-gray-500" role="alert">
                <div v-if="toastType === 'danger'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-invictus-red-100 rounded-lg dark:bg-invictus-red-800 dark:text-red-200">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Error icon</span>
                </div>
                <div v-if="toastType === 'success'" class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Check icon</span>
                </div>
                <div class="mx-3 text-sm font-normal">{{ toastMsg }}</div>
                <button @click="closeToast" type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-invictus-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-invictus-gray-800 dark:hover:bg-invictus-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        <!-- modal -->
        <div v-if="modalUp" aria-hidden="true" class="fixed flex top-0 z-50 w-full md:inset-0 h-modal md:h-full bg-[rgba(0,0,0,.8)]">
            <div class="relative p-4 mx-auto my-auto w-full max-w-md h-1/2 md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-invictus-gray-700">
                    <button @click="closeModal" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-invictus-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-invictus-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="py-8 px-14 lg:px-8">
                        <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">{{ modalData.title }}</h3>
                        <h3 class="mb-4 text-sm font-normal text-gray-900 dark:text-gray-400">{{ modalData.body }}</h3>
                        <form class="space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Claim amount</label>
                                <input type="number" :value="claimAmount" @change="setClaimAmount($event)" :max="maxAmount" form class="bg-invictus-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-invictus-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Claim amount" required>
                            </div>
                            <button @click="claimAllRewards(claimAmount)" type="button" :class="!claimValid ? 'opacity-30 cursor-not-allowed' : ''" class="w-full text-white bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-0 focus:outline-none focus:ring-invictus-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-invictus-red-600 dark:invictus-red:bg-blue-700 dark:focus:ring-invictus-red-800">
                                <svg v-if="claiming" aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                {{ claimingText }}</button>
                            <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                            </div> -->
                        </form>
                    </div>
                </div>
            </div>
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
    import { serializeError } from "eth-rpc-errors"
    const CONSTANTS = import.meta.env.VITE_APP_ENV === prod ? prod : dev
    export default {
        data() {
            return {
                authLoader: false,
                mmLoader: false,
                mmInstalled: false,
                claiming: false,
                isDropdownOpen: false,
                toastUp: false,
                toastMsg: '',
                toastType: '',
                modalUp: false,
                modalData: {},
                maxAmount: undefined,
                claimAmount: undefined,
                claimTxnHash: undefined
                // modalKey: 0
            }
        },
        components: {
            Loader
        },
        created() {
            if(typeof window.ethereum !== 'undefined') this.mmInstalled = true
            this.$store.dispatch('fetchInventory')
            window.addEventListener('click', this.onClickApp)
        },
        destroyed() {
            window.removeEventListener('click', this.onClickApp)
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeMount () {
            window.removeEventListener('scroll', this.handleScroll);
        }, 
        methods: {
            toggleDropdown() {
                if(this.isDropdownOpen) {
                    this.isDropdownOpen = false
                } else {
                    this.isDropdownOpen = true
                    this.$store.commit("clicked", 0)
                }
            },
            logout() {
                this.$store.dispatch('disconnect')
                this.$router.push({name: 'Home'})
                this.isDropdownOpen = false
            },
            openToast(msg, type) {
                this.toastMsg = msg
                this.toastUp = true
                this.toastType = type
                setTimeout(() => {
                    this.closeToast()
                }, 10000)

            },
            openModal(data) {
                this.modalData = data
                this.modalUp = true
            },
            closeToast() {
                this.toastUp = false
                this.toastMsg = ''
                this.toastType = ''
            },
            closeModal() {
                this.modalUp = false
                this.modalMsg = ''
            },
            setClaimAmount(amnt) {
                this.claimAmount = Number.parseFloat(amnt.target.value)
            },
            async claimAllRewards(amount) {
                if(this.claimTxnHash) {
                    window.open(CONSTANTS.chainInfo.chainExplorer + 'tx/' + this.claimTxnHash, "_blank")
                    return false
                }
                console.log(amount, this.claimValid)
                if(this.rewardsFormatted === (0).toString() || this.rewardsFormatted === 0) return false
                if(amount && !this.claimValid) return false
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
                            this.openToast('Please switch your wallet address to your logged in address')
                            // this.$buefy.snackbar.open({
                            //     // duration: 5000,
                            //     indefinite: true,
                            //     message: 'Please switch your wallet address to your logged in address',
                            //     type: 'is-danger',
                            //     position: 'is-bottom',
                            //     actionText: 'Close'
                            // })
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
                                this.openToast('Failed to switch network. Please try again', 'danger')
                                // this.$buefy.snackbar.open({
                                //     duration: 5000,
                                //     message: 'Failed to switch network. Please try again',
                                //     type: 'is-danger',
                                //     position: 'is-bottom',
                                // })
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
                        const signature = ethers.utils.splitSignature(res.data.signature)
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
                            this.claimTxnHash = tx.hash
                            await tx.wait()
                            this.claimTxnHash = undefined
                            this.$store.dispatch('fetchProfile')
                            this.$store.dispatch('fetchInventory')
                            this.closeModal()
                            this.openToast('Rewards Claimed! Check your balance.', 'success')
                            // this.$buefy.snackbar.open({
                            //     duration: 5000,
                            //     message: 'Rewards Claimed! Check your balance.',
                            //     type: 'is-success', 
                            //     position: 'is-top'
                            // })
                        } catch(err) {
                            console.log(serializeError(err))
                            if((serializeError(err).code === -32603)) {
                                const message = serializeError(err).data.originalError.reason != "execution reverted: Amounts exceeds daily minting limit" ? 
                                serializeError(err).data.originalError.reason : 
                                serializeError(err).data.originalError.reason.split(':')[1]
                                const withdrawablAmnt = Number(ethers.utils.formatEther(await MinterContract.getAllowedDailyMint()))
                                const today = Number.parseInt(((Date.now() / 1000) / 86400).toString().split('.')[0])
                                const DailyMinted = Number(ethers.utils.formatEther(await MinterContract.DailyMinted(today)))
                                this.maxAmount = this.$store.state.profile.rewards < withdrawablAmnt ? this.$store.state.profile.rewards : withdrawablAmnt
                                this.claimAmount = this.maxAmount
                                // this.$buefy.dialog.prompt({
                                //     title: message,
                                //     message: `The daily maximum VON amount to be minted is ${CONSTANTS.economicPolicy.dailyRewards.toLocaleString()} VON. Other players minted ${DailyMinted.toLocaleString()} VON. You can mint up to ${withdrawablAmnt.toLocaleString()} VON.`,
                                //     type: 'is-danger',
                                //     inputAttrs: {
                                //         placeholder: 'e.g. Walter',
                                //         maxlength: 10,
                                //         max: MaxAmount,
                                //         value: withdrawablAmnt,
                                //         required: true,
                                //     },
                                //     trapFocus: true,
                                //     confirmText: 'Try Again',
                                //     onConfirm: (value) => this.claimAllRewards(Number.parseInt(value))
                                // })
                                this.openModal({title: message, body: `The daily maximum VON amount to be minted is ${CONSTANTS.economicPolicy.dailyRewards.toLocaleString()} VON. Other players minted ${DailyMinted.toLocaleString()} VON. You can mint up to ${withdrawablAmnt.toLocaleString()} VON.`})
                            } else {
                                this.openToast('Error occurred! Try again.', 'danger')
                                // this.$buefy.toast.open('Error occurred! Try again.')
                            }
                        }
                    } else {
                        this.openToast('Cannot connect wallet. Please use a web3 wallet in your browser', 'danger')
                        // this.$buefy.snackbar.open({
                        //     duration: 5000,
                        //     message: 'Cannot connect wallet. Please use a web3 wallet in your browser',
                        //     type: 'is-danger',
                        //     position: 'is-bottom',
                        // })
                    }
                } finally {
                    this.claiming = false
                }
            },
            openLeaderboard() {
                let routeData = this.$router.push({ name: 'Leaderboard' })
                window.open(routeData.href, '_self')
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
                            // this.$buefy.toast.open('Welcome back my Lord!')
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
            formatName(name) {
                if(this.$store.state.address) return name.slice(0, 11) + ' ..'
                return '--'
            },
            handleScroll () {
                this.$store.commit('setScrollY', window.scrollY)
            },
            openScanner() {
                window.open(CONSTANTS.chainInfo.chainExplorer + 'address/' + this.$store.state.address, "_blank")
            },
            onClickApp() {
                this.$store.commit("clicked")                
            },
            zeroClicks() {
                this.$store.commit("clicked", 0) 
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
                return this.$store.state.address ? this.$store.state.address.slice(0, 5) + '...' + this.$store.state.address.slice(-4) : '--'
            },
            rewardsFormatted() {
                return this.$store.state.profile ? Number(this.$store.state.profile.rewards).toLocaleString() : 0
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
            playerAlias() {
                if(this.$store.state.profile === undefined) return ''
                else return this.$store.state.profile.playerAlias
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
            },
            clicks() {
                return this.$store.state.clicked
            },
            claimValid() {
                return this.claimAmount <= this.maxAmount
            },
            claimingText() {
                if(!this.claiming) return 'Claim'
                else if(this.claiming && !this.claimTxnHash) return 'Claiming..'
                else if(this.claiming && this.claimTxnHash) return 'View pending transaction'
            }
        },
        watch: {
            clicks() {
                if(this.isDropdownOpen && this.$store.state.clicked === 2) this.isDropdownOpen = false
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