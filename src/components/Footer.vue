<template>
<footer class="bg-white dark:bg-invictus-gray-900 pt-16">
  <!-- <div clas="grid grid-cols-3 gap-4">
    <div class="col-span-6">
      <p>2</p>
      <p class="text-3xl mb-8 font-bold leading-tight text-center dark:text-white">Help us build it</p>
      <p class="w-4/5 mx-auto   font-medium text-base text-center text-gray-500 dark:text-gray-400">Unlike the majority of current P2E games. VON token inflation is controlled and is fixed to 100K daily and is halving each 1 year (4 seasons). No insiders allocations. The token belongs to the players only. No hyper-inflation lords.</p>
      <div class="flex justify-center items-center my-6">
          <a href="https://discord.gg/bBbmywSU6N" target="_blank" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Join Discord</a>
      </div>
    </div>
    <div class="col-span-6">
      <p>2</p>
      <p class="text-3xl mb-8 font-bold leading-tight text-center dark:text-white">Help us build it</p>
      <p class=" w-4/5 mx-auto  font-medium text-base text-center text-gray-500 dark:text-gray-400">Unlike the majority of current P2E games. VON token inflation is controlled and is fixed to 100K daily and is halving each 1 year (4 seasons). No insiders allocations. The token belongs to the players only. No hyper-inflation lords.</p>
      <div class="flex justify-center items-center my-6">
          <a href="https://discord.gg/bBbmywSU6N" target="_blank" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Join Discord</a>
      </div>
    </div>
  </div> -->
  <div class="container max-w-screen-xl px-4 mx-auto">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-2 border border-invictus-gray-700 rounded-lg p-7">
        <div class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
            <div class="col-span-7 text-center sm:mb-6 lg:text-left lg:mb-0">
                <h1 class="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl xl:text-3xl dark:text-white">Be aquainted with our philosophy</h1>
                <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 text-base dark:text-gray-400">
                  If you want to be familiar with Invictus Lords’ agenda and philosophy just hit the button and follow us on medium.  
                </p>
                <button @click="openLink('https://medium.com/invictuslords/the-player-and-its-own-chapter-i-a-gamer-manifesto-55fa51095892')" type="button" class="text-white bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-4 focus:outline-none focus:ring-invictus-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-invictus-red-800 dark:hover:bg-invictus-red-600 dark:focus:ring-invictus-red-800">
                  <svg class="inline mr-3 w-6 h-6 text-white" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2812 10.7396C11.2812 13.8818 8.75579 16.4291 5.6407 16.4291C2.52561 16.4291 0 13.8812 0 10.7396C0 7.59787 2.52542 5.0498 5.6407 5.0498C8.75598 5.0498 11.2812 7.59729 11.2812 10.7396Z" fill="white"/>
                  <path d="M17.469 10.7395C17.469 13.6973 16.2063 16.096 14.6487 16.096C13.091 16.096 11.8283 13.6973 11.8283 10.7395C11.8283 7.78175 13.0908 5.38306 14.6485 5.38306C16.2061 5.38306 17.4688 7.78098 17.4688 10.7395" fill="white"/>
                  <path d="M20 10.7395C20 13.389 19.556 15.5381 19.0081 15.5381C18.4602 15.5381 18.0164 13.3895 18.0164 10.7395C18.0164 8.08951 18.4604 5.94098 19.0081 5.94098C19.5558 5.94098 20 8.08932 20 10.7395Z" fill="white"/>
                  </svg>
                Read the Manifeso</button>
            </div>
            <div class="flex col-span-5 align-middle justify-center">
                <img src="/img/medium-cta.png" class="w-full dark:hidden" alt="mockup">
                <img src="/img/medium-cta.png" class="w-full hidden dark:block" alt="mockup dark">
            </div>
        </div>
      </div>
      <div class="col-span-2 border border-invictus-gray-700 rounded-lg p-7">
        <div class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
            <div class="col-span-7 text-center sm:mb-6 lg:text-left lg:mb-0">
                <h1 class="mb-2 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl xl:text-3xl dark:text-white">Share your thougts join our discord</h1>
                <p class="max-w-xl mx-auto mb-6 font-light text-gray-500 lg:mx-0 xl:mb-8 text-base dark:text-gray-400">
                  If you’re well-aquainted with our line of thought and philosophy, just share your ideas & arguments with us on discord.
                </p>
                <button @click="openLink('https://discord.gg/bBbmywSU6N')"  type="button" class="text-white bg-invictus-red-700 hover:bg-invictus-red-800 focus:ring-4 focus:outline-none focus:ring-invictus-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-invictus-gray-700 dark:hover:bg-invictus-gray-600 dark:focus:ring-invictus-gray-800">
                  <svg class="inline mr-3 w-6 h-6 text-white" width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 2.15557C18.7873 1.45369 17.147 0.936576 15.4319 0.640403C15.4007 0.634687 15.3695 0.648971 15.3534 0.677541C15.1424 1.05276 14.9087 1.54226 14.7451 1.927C12.9004 1.65083 11.0652 1.65083 9.25832 1.927C9.09465 1.5337 8.85248 1.05276 8.64057 0.677541C8.62448 0.649924 8.59328 0.63564 8.56205 0.640403C6.84791 0.93563 5.20756 1.45275 3.67694 2.15557C3.66368 2.16129 3.65233 2.17082 3.64479 2.18319C0.533392 6.83155 -0.31895 11.3657 0.0991801 15.8436C0.101072 15.8655 0.11337 15.8864 0.130398 15.8997C2.18321 17.4073 4.17171 18.3225 6.12328 18.9291C6.15451 18.9386 6.18761 18.9272 6.20748 18.9015C6.66913 18.2711 7.08064 17.6063 7.43348 16.9073C7.4543 16.8664 7.43442 16.8178 7.39186 16.8016C6.73913 16.554 6.1176 16.2521 5.51973 15.9093C5.47244 15.8816 5.46865 15.814 5.51216 15.7816C5.63797 15.6873 5.76382 15.5893 5.88395 15.4902C5.90569 15.4721 5.93598 15.4683 5.96153 15.4797C9.88928 17.273 14.1415 17.273 18.023 15.4797C18.0485 15.4674 18.0788 15.4712 18.1015 15.4893C18.2216 15.5883 18.3475 15.6873 18.4742 15.7816C18.5177 15.814 18.5149 15.8816 18.4676 15.9093C17.8697 16.2588 17.2482 16.554 16.5945 16.8006C16.552 16.8168 16.533 16.8664 16.5538 16.9073C16.9143 17.6054 17.3258 18.2701 17.7789 18.9005C17.7978 18.9272 17.8319 18.9386 17.8631 18.9291C19.8241 18.3225 21.8126 17.4073 23.8654 15.8997C23.8834 15.8864 23.8948 15.8664 23.8967 15.8445C24.3971 10.6676 23.0585 6.17064 20.3482 2.18414C20.3416 2.17082 20.3303 2.16129 20.317 2.15557ZM8.02002 13.117C6.8375 13.117 5.86313 12.0313 5.86313 10.6981C5.86313 9.36477 6.8186 8.27912 8.02002 8.27912C9.23087 8.27912 10.1958 9.3743 10.1769 10.6981C10.1769 12.0313 9.22141 13.117 8.02002 13.117ZM15.9947 13.117C14.8123 13.117 13.8379 12.0313 13.8379 10.6981C13.8379 9.36477 14.7933 8.27912 15.9947 8.27912C17.2056 8.27912 18.1705 9.3743 18.1516 10.6981C18.1516 12.0313 17.2056 13.117 15.9947 13.117Z" fill="white"/>
                  </svg>
                Join Discord</button>
            </div>
            <div class="flex col-span-5 align-middle justify-center">
                <img src="/img/discord-cta.png" class="w-full dark:hidden" alt="mockup">
                <img src="/img/discord-cta.png" class="w-full hidden dark:block" alt="mockup dark">
            </div>
        </div>
    </div>
  </div>

</div>
  <!-- <div class="max-w-screen-xl mx-auto">

  </div> -->
  <div class="p-4 pb-6 mx-auto max-w-screen-xl md:pb-8 lg:pb-10">
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-invictus-gray-700 lg:my-8">
      <div class="text-center">
          <a href="#" class="flex justify-center items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
            <svg class="mr-3 h-12" viewBox="0 0 19 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3716 22.9315C18.3892 22.8513 18.3988 22.7679 18.3988 22.6823V6.49247C18.3992 6.48209 18.3988 6.4717 18.3988 6.46132V6.45738C18.3988 6.45666 18.3988 6.45631 18.3988 6.45559C18.3985 6.43983 18.3981 6.42408 18.3974 6.40833C18.3816 6.01016 18.174 5.63813 17.8295 5.43475C17.4142 5.18948 16.9068 5.22851 16.5383 5.50457C16.0263 5.71189 15.4835 5.81752 14.9224 5.81859C14.9138 5.81824 14.9056 5.81824 14.8973 5.81824H14.8948C12.5158 5.80714 10.5809 3.86321 10.5809 1.48352C10.5802 0.841509 10.0595 0.320526 9.41716 0.320526C8.88973 0.320526 8.4443 0.671787 8.30179 1.15302C8.242 1.31344 8.21622 1.48925 8.23376 1.67114C8.37269 3.11306 7.68306 4.57969 6.43449 5.4992C5.83008 5.94427 5.134 6.23753 4.42181 6.34781C3.73111 6.45452 3.0046 6.28658 2.25875 6.05599C1.93184 5.80391 1.49178 5.74089 1.10328 5.90166C0.668233 6.08177 0.385005 6.50608 0.385005 6.97657V7.03171C0.385005 7.03744 0.385005 7.04281 0.385005 7.04854V23.1793C0.383215 23.2678 0.39145 23.3569 0.410427 23.4454C0.410427 23.4457 0.410427 23.4461 0.410785 23.4464C0.414008 23.4611 0.417231 23.4754 0.421169 23.4901C0.424034 23.5023 0.427614 23.5145 0.430837 23.5266C0.431195 23.5277 0.431553 23.5288 0.431911 23.5302C0.578717 24.0483 1.05924 24.4207 1.62462 24.3846C1.8348 24.3709 2.02995 24.3015 2.19502 24.1908C3.52666 23.6405 5.11789 23.8492 6.39009 24.7523C7.69201 25.6764 8.38164 27.1076 8.23484 28.5803C8.1711 29.2195 8.63766 29.7895 9.2768 29.8533C9.31619 29.8572 9.35522 29.859 9.39389 29.859C9.98433 29.859 10.4903 29.4111 10.5501 28.8113C10.5708 28.6043 10.5805 28.397 10.5805 28.1904C10.5805 28.1825 10.5812 28.1747 10.5812 28.1668C10.5812 26.7342 11.3471 25.3907 12.6297 24.5736C13.9105 23.7576 15.4487 23.6312 16.7449 24.2352C17.3271 24.5067 18.0193 24.2546 18.2907 23.6724C18.4021 23.4314 18.4246 23.1722 18.3716 22.9315ZM7.81375 7.37259C8.52988 6.84552 9.12462 6.19564 9.57686 5.46984C9.76448 5.72013 9.97073 5.95931 10.1956 6.18489C11.2243 7.21719 12.5323 7.87102 13.9499 8.07547L9.1214 12.9043L4.85113 8.63441C5.9067 8.45896 6.92934 8.02391 7.81375 7.37259ZM11.3786 22.6111C10.5773 23.1217 9.90843 23.7715 9.39783 24.5142C8.94917 23.88 8.3863 23.3161 7.73605 22.8545C6.78897 22.1825 5.69402 21.7517 4.56898 21.6088C3.94523 21.5297 3.32005 21.5419 2.71134 21.6411V9.78988C2.71134 9.78809 2.71349 9.78701 2.71493 9.78845L7.4761 14.5496L4.62305 17.4027C4.1615 17.8642 4.16902 18.6169 4.64489 19.0691C5.10536 19.5063 5.8376 19.478 6.28661 19.029L9.1214 16.1949L11.9591 19.0326C12.4134 19.487 13.15 19.487 13.6044 19.0326C14.0587 18.5782 14.0587 17.8417 13.6044 17.3873L10.7667 14.5496L16.0689 9.24741C16.0703 9.24598 16.0725 9.24705 16.0725 9.24884V21.6156C14.4859 21.3543 12.8188 21.6933 11.3786 22.6111Z" fill="#F21111"/>
            </svg>
              Invictus Lords    
          </a>
          <span class="block text-sm text-center text-gray-500 dark:text-gray-400">© 2023-2023 <a href="#" class="hover:underline">Invictus Lords</a>. All Rights Reserved.
          </span>
          <ul class="flex justify-center mt-5 space-x-5">\
            <li>
                <a href="https://t.me/invictuslords" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                    <svg class="w-5 h-5"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.43 8.85893C11.2628 9.3444 8.93014 10.3492 5.43189 11.8733C4.86383 12.0992 4.56626 12.3202 4.53917 12.5363C4.49339 12.9015 4.95071 13.0453 5.57347 13.2411C5.65818 13.2678 5.74595 13.2954 5.83594 13.3246C6.44864 13.5238 7.27283 13.7568 7.70129 13.766C8.08994 13.7744 8.52373 13.6142 9.00264 13.2853C12.2712 11.079 13.9584 9.96381 14.0643 9.93977C14.139 9.92281 14.2426 9.90148 14.3128 9.96385C14.3829 10.0262 14.376 10.1443 14.3686 10.176C14.3233 10.3691 12.5281 12.0381 11.5991 12.9018C11.3095 13.171 11.1041 13.362 11.0621 13.4056C10.968 13.5033 10.8721 13.5958 10.78 13.6846C10.2108 14.2333 9.78391 14.6448 10.8036 15.3168C11.2936 15.6397 11.6858 15.9067 12.0769 16.1731C12.5042 16.4641 12.9303 16.7543 13.4816 17.1157C13.6221 17.2077 13.7562 17.3034 13.8869 17.3965C14.3841 17.751 14.8307 18.0694 15.3826 18.0186C15.7032 17.9891 16.0345 17.6876 16.2027 16.7884C16.6002 14.6631 17.3816 10.0585 17.5622 8.16097C17.578 7.99473 17.5581 7.78197 17.5422 7.68857C17.5262 7.59518 17.4928 7.46211 17.3714 7.3636C17.2276 7.24694 17.0056 7.22234 16.9064 7.22408C16.455 7.23203 15.7626 7.47282 12.43 8.85893Z" fill="#9CA3AF"/>
                    </svg>
                </a>
              </li>
              <li>
                  <a href="https://www.instagram.com/invictuslords/" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                  </a>
              </li>
              <li>
                  <a href="https://twitter.com/Invictus_Lords" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
              </li>
                <li>
                  <a href="https://discord.gg/bBbmywSU6N" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                    <svg class="w-5 h-5" width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 2.15557C18.7873 1.45369 17.147 0.936576 15.4319 0.640403C15.4007 0.634687 15.3695 0.648971 15.3534 0.677541C15.1424 1.05276 14.9087 1.54226 14.7451 1.927C12.9004 1.65083 11.0652 1.65083 9.25832 1.927C9.09465 1.5337 8.85248 1.05276 8.64057 0.677541C8.62448 0.649924 8.59328 0.63564 8.56205 0.640403C6.84791 0.93563 5.20756 1.45275 3.67694 2.15557C3.66368 2.16129 3.65233 2.17082 3.64479 2.18319C0.533392 6.83155 -0.31895 11.3657 0.0991801 15.8436C0.101072 15.8655 0.11337 15.8864 0.130398 15.8997C2.18321 17.4073 4.17171 18.3225 6.12328 18.9291C6.15451 18.9386 6.18761 18.9272 6.20748 18.9015C6.66913 18.2711 7.08064 17.6063 7.43348 16.9073C7.4543 16.8664 7.43442 16.8178 7.39186 16.8016C6.73913 16.554 6.1176 16.2521 5.51973 15.9093C5.47244 15.8816 5.46865 15.814 5.51216 15.7816C5.63797 15.6873 5.76382 15.5893 5.88395 15.4902C5.90569 15.4721 5.93598 15.4683 5.96153 15.4797C9.88928 17.273 14.1415 17.273 18.023 15.4797C18.0485 15.4674 18.0788 15.4712 18.1015 15.4893C18.2216 15.5883 18.3475 15.6873 18.4742 15.7816C18.5177 15.814 18.5149 15.8816 18.4676 15.9093C17.8697 16.2588 17.2482 16.554 16.5945 16.8006C16.552 16.8168 16.533 16.8664 16.5538 16.9073C16.9143 17.6054 17.3258 18.2701 17.7789 18.9005C17.7978 18.9272 17.8319 18.9386 17.8631 18.9291C19.8241 18.3225 21.8126 17.4073 23.8654 15.8997C23.8834 15.8864 23.8948 15.8664 23.8967 15.8445C24.3971 10.6676 23.0585 6.17064 20.3482 2.18414C20.3416 2.17082 20.3303 2.16129 20.317 2.15557ZM8.02002 13.117C6.8375 13.117 5.86313 12.0313 5.86313 10.6981C5.86313 9.36477 6.8186 8.27912 8.02002 8.27912C9.23087 8.27912 10.1958 9.3743 10.1769 10.6981C10.1769 12.0313 9.22141 13.117 8.02002 13.117ZM15.9947 13.117C14.8123 13.117 13.8379 12.0313 13.8379 10.6981C13.8379 9.36477 14.7933 8.27912 15.9947 8.27912C17.2056 8.27912 18.1705 9.3743 18.1516 10.6981C18.1516 12.0313 17.2056 13.117 15.9947 13.117Z" fill="#9CA3AF"/>
                    </svg>
                  </a>
              </li>
              <li>
                <a href="http://medium.com/invictuslords" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  <svg  class="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5374 11.8277C13.5374 15.5984 10.5069 18.6552 6.76884 18.6552C3.03073 18.6552 0 15.5977 0 11.8277C0 8.05767 3.0305 5 6.76884 5C10.5072 5 13.5374 8.05698 13.5374 11.8277Z" fill="#9CA3AF"/>
                  <path d="M20.9628 11.8277C20.9628 15.377 19.4476 18.2554 17.5784 18.2554C15.7092 18.2554 14.194 15.377 14.194 11.8277C14.194 8.27834 15.709 5.3999 17.5782 5.3999C19.4473 5.3999 20.9626 8.27742 20.9626 11.8277" fill="#5C5E63"/>
                  <path d="M24 11.8276C24 15.0069 23.4672 17.5858 22.8097 17.5858C22.1522 17.5858 21.6196 15.0076 21.6196 11.8276C21.6196 8.64758 22.1524 6.06934 22.8097 6.06934C23.4669 6.06934 24 8.64735 24 11.8276Z" fill="#5C5E63"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@invictuslords" target="_blank" class="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  <svg class="h-5 w-5" width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.0725 0H11.0278V16.3478C11.0278 18.2957 9.47219 19.8957 7.53626 19.8957C5.60034 19.8957 4.04469 18.2957 4.04469 16.3478C4.04469 14.4348 5.56577 12.8695 7.43257 12.8V8.69567C3.31872 8.7652 0 12.1391 0 16.3478C0 20.5913 3.38786 24 7.57085 24C11.7538 24 15.1416 20.5565 15.1416 16.3478V7.9652C16.6627 9.07827 18.5295 9.73913 20.5 9.77393V5.66957C17.4579 5.56522 15.0725 3.06087 15.0725 0Z" fill="#9CA3AF"/>
                  </svg>
                </a>
              </li>

          </ul>
          <span class="block text-xs text-center pt-10 text-gray-500 dark:text-gray-700">This site is not affiliated with Valve. Landing page game assets are not owned by Invictus Lords.</span>
      </div>
  </div>
</footer>
</template>

<script>
  export default {
    methods: {
      openLink(href) {
        window.open(href, '_blank')
      }
    }
  }
</script>