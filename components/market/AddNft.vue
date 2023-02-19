<!-- eslint-disable import/namespace -->
<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { marketplaceAddress } from "../../config";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

const loading = ref(false);
const isOpen = ref(false);
const name = ref("test");
const productUrl = ref("https://alizemani.ir/market/nft-01");
const price = ref(0.001);
const numberAll = ref(20);
const description = ref("Details");

const addNft = async () => {
  loading.value = true;
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  /* next, create the item */
  const priceEth = ethers.utils.parseUnits(String(price.value), "ether");
  const contract = new ethers.Contract(
    marketplaceAddress,
    NFTMarketplace.abi,
    signer
  );
  let listingPrice = await contract.getListingPrice();
  listingPrice = listingPrice.toString();

  const nftMetadata = JSON.stringify({
    name: name.value,
    product: productUrl.value,
    description: description.value,
  });
  const transaction = await contract.createToken(nftMetadata, priceEth, {
    value: listingPrice,
  });
  await transaction.wait();
  loading.value = false;
  isOpen.value = false;
};
</script>

<template>
  <span
    class="flex pt-10 text-lg cursor-pointer justify-between items-center"
    @click="isOpen = true"
  >
    <IconUil:plus
      class="ml-2 text-2xl flex text-green-600"
      aria-hidden="true"
    />
    <span class="flex"> افزودن NFT </span>
  </span>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog
      as="div"
      class="relative z-10 overflow-hidden"
      @close="isOpen = false"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-3xl max-h-140 transform overflow-hidden rounded-md bg-white p-5 text-right items-center shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                افزودن بسته حدید فروش
              </DialogTitle>
              <div class="mt-5">
                <div class="flex justify-around gap-10">
                  <div class="form-group mb-6 basis-1/2">
                    <label
                      for="name"
                      class="form-label inline-block mb-2 text-gray-700"
                      >نام
                    </label>
                    <input
                      id="name"
                      v-model="name"
                      type="text"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div class="form-group mb-6 basis-1/2">
                    <label
                      for="productUrl"
                      class="form-label inline-block mb-2 text-gray-700"
                      >مرتبط با محصول</label
                    >
                    <input
                      id="productUrl"
                      v-model="productUrl"
                      type="text"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                    />
                  </div>
                </div>
                <div class="flex justify-around gap-10">
                  <div class="form-group mb-6 basis-1/2">
                    <label
                      for="price"
                      class="form-label inline-block mb-2 text-gray-700"
                    >
                      (ETH) قیمت</label
                    >
                    <input
                      id="price"
                      v-model="price"
                      type="text"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                    />
                  </div>
                  <div class="form-group mb-6 basis-1/2">
                    <label
                      for="numberAll"
                      class="form-label inline-block mb-2 text-gray-700"
                    >
                      تعداد</label
                    >
                    <input
                      id="numberAll"
                      v-model="numberAll"
                      type="text"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                    />
                  </div>
                </div>
                <div class="form-group mb-6">
                  <label
                    for="description"
                    class="form-label inline-block mb-2 text-gray-700"
                  >
                    توضیحات</label
                  >
                  <textarea
                    id="description"
                    v-model="description"
                    :rows="4"
                    type="text"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder=""
                  />
                </div>
              </div>

              <div
                class="flex mt-4 w-full items-center justify-between text-white text-xl"
              >
                <button
                  type="button"
                  class="flex justify-center rounded-md-md border border-transparent bg-red-400 px-5 py-1"
                  @click="isOpen = false"
                >
                  بستن
                </button>
                <button
                  type="button"
                  class="flex rounded items-center border border-transparent bg-green-400 px-5 py-1"
                  @click="addNft"
                >
                  <span class="flex"> افزودن NFT </span>
                  <svg
                    v-if="loading"
                    aria-hidden="true"
                    class="flex w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
