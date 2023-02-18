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

const isOpen = ref(false);
const name = ref("test");
const productUrl = ref("https://alizemani.ir/market/nft-01");
const price = ref(0.001);
const numberAll = ref(20);
const description = ref("Details");

const addNft = async () => {
  // const url = "https://alizemani.ir";
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
  const transaction = await contract.createToken(productUrl.value, priceEth, {
    value: listingPrice,
  });
  await transaction.wait();
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
                  class="flex rounded border border-transparent bg-green-400 px-5 py-1"
                  @click="addNft"
                >
                  افزودن NFT
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
