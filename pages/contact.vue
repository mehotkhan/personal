<script setup>
useHead({
  title: " تماس با من",
});
</script>
<template>
  <section class="flex flex-col justify-center content-center">
    <div class="flex justify-between items-center p-4">
      <h2 class="flex text-5xl">چت خصوصی</h2>
      <div class="absolute top-15 left-5 flex">
        <span class="block text-gray-700">
          وضعیت:
          <span
            class="inline-block align-text-bottom w-4 h-4 bg-green-400 rounded-full border-2 border-white"
          ></span>
          <b>آنلاین</b>
          <span class="inline-block align-text-bottom">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </span>

        <span
          class="inline-block ml-8 text-gray-700 hover:text-gray-900 align-bottom"
        >
          <span class="block h-6 w-6 p-1 rounded-sm hover:bg-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4"
            >
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </span>
        </span>
      </div>
    </div>
    <hr />
    <div class="main flex-1 flex flex-col p-4 mt-3">
      <div class="flex-1 flex h-full">
        <div class="chat-area flex-1 flex flex-col">
          <div class="flex-3">
            <h2 class="text-xl py-1 mb-8 border-b-2 border-gray-200">
              گفتگو با <b>مهندس فلانی</b>
            </h2>
          </div>
          <div class="messages flex-1 overflow-auto">
            <div class="message mb-4 flex">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div
                  class="inline-block bg-gray-300 rounded-sm p-2 px-6 text-gray-700"
                >
                  <span
                    >Hey there. We would like to invite you over to our office
                    for a visit. How about it?</span
                  >
                </div>
                <div class="pl-4">
                  <small class="text-gray-500">15 April</small>
                </div>
              </div>
            </div>
            <div class="message mb-4 flex">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div
                  class="inline-block bg-gray-300 rounded-sm p-2 px-6 text-gray-700"
                >
                  <span
                    >All travel expenses are covered by us of course :D</span
                  >
                </div>
                <div class="pl-4">
                  <small class="text-gray-500">15 April</small>
                </div>
              </div>
            </div>
            <div class="message me mb-4 flex text-right">
              <div class="flex-1 px-2">
                <div
                  class="inline-block bg-blue-600 rounded-sm p-2 px-6 text-white"
                >
                  <span>It's like a dream come true</span>
                </div>
                <div class="pr-4">
                  <small class="text-gray-500">15 April</small>
                </div>
              </div>
            </div>
            <div class="message me mb-4 flex text-right">
              <div class="flex-1 px-2">
                <div
                  class="inline-block bg-blue-600 rounded-sm p-2 px-6 text-white"
                >
                  <span>I accept. Thank you very much.</span>
                </div>
                <div class="pr-4">
                  <small class="text-gray-500">15 April</small>
                </div>
              </div>
            </div>
            <div class="message mb-4 flex">
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div
                  class="inline-block bg-gray-300 rounded-sm p-2 px-6 text-gray-700"
                >
                  <span>You are welome. We will stay in touch.</span>
                </div>
                <div class="pl-4">
                  <small class="text-gray-500">15 April</small>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-2 pt-4 pb-10">
            <div class="write bg-white shadow flex rounded-lg">
              <div
                class="flex-3 flex content-center items-center text-center p-4 pr-0"
              >
                <span
                  class="block text-center text-gray-400 hover:text-gray-800"
                >
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    class="h-6 w-6"
                  >
                    <path
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
              </div>
              <div class="flex-1">
                <textarea
                  name="message"
                  class="w-full block outline-none py-4 px-4 bg-transparent"
                  rows="1"
                  placeholder="Type a message..."
                  autofocus
                ></textarea>
              </div>
              <div class="flex-2 w-32 p-2 flex content-center items-center">
                <div class="flex-1 text-center">
                  <span class="text-gray-400 hover:text-gray-800">
                    <span class="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        class="w-6 h-6"
                      >
                        <path
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </div>
                <div class="flex-1">
                  <button class="bg-blue-400 w-10 h-10 rounded-sm inline-block">
                    <span class="inline-block align-text-bottom">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        class="w-4 h-4 text-white"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
          <div class="search flex-2 pb-6 px-2">
            <input
              type="text"
              class="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200"
              placeholder="جستجو"
            />
          </div>
          <div class="flex-1 h-full overflow-auto px-2">
            <div
              class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
            >
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-green-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32">
                  <span class="text-gray-800">Ryann Remo</span>
                </div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
                <div>
                  <small
                    class="text-xs bg-red-500 text-white rounded-sm h-6 w-6 leading-6 text-center inline-block"
                  >
                    23
                  </small>
                </div>
              </div>
            </div>
            <div
              class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
            >
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32">
                  <span class="text-gray-800">Karp Bonolo</span>
                </div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
                <div>
                  <small
                    class="text-xs bg-red-500 text-white rounded-sm h-6 w-6 leading-6 text-center inline-block"
                  >
                    10
                  </small>
                </div>
              </div>
            </div>
            <div
              class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md border-r-4 border-red-500"
            >
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32">
                  <span class="text-gray-800">Mercedes Yemelyan</span>
                </div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            <div
              class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
            >
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32">
                  <span class="text-gray-800">Cadi Kajetán</span>
                </div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
            <div
              class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md"
            >
              <div class="flex-2">
                <div class="w-12 h-12 relative">
                  <img
                    class="w-12 h-12 rounded-sm mx-auto"
                    src="https://i.pravatar.cc/300
"
                    alt="chat-user"
                  />
                  <span
                    class="absolute w-4 h-4 bg-gray-400 rounded-sm right-0 bottom-0 border-2 border-white"
                  ></span>
                </div>
              </div>
              <div class="flex-1 px-2">
                <div class="truncate w-32">
                  <span class="text-gray-800">Rina Samuel</span>
                </div>
                <div><small class="text-gray-600">Yea, Sure!</small></div>
              </div>
              <div class="flex-2 text-right">
                <div><small class="text-gray-500">15 April</small></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-area prose-md lg:prose-2xl w-full font-normal">
      <ContentDoc path="/pages/contact" />
    </div>
  </section>
</template>
