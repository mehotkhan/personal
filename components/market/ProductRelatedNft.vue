<script lang="ts" setup>
import { ethers } from "ethers";
import { marketplaceAddress } from "../../config";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
const items = ref<any[]>([]);
const loading = ref(false);
const loadNFTs = async () => {
  loading.value = true;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com"
  );

  const contract = new ethers.Contract(
    marketplaceAddress,
    NFTMarketplace.abi,
    provider
  );
  const data = await contract.fetchMarketItems();
  Promise.all(
    data.map(async (i: any) => {
      try {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        const tokenMetadata = JSON.parse(tokenUri);
        if (tokenMetadata?.name) {
          items.value.push({
            price,
            name: tokenMetadata.name,
            product: tokenMetadata.product,
            description: tokenMetadata.description,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
          });
        }
      } catch (error) {}
    })
  ).then(() => {
    loading.value = false;
  });
};

onMounted(() => {
  loadNFTs();
});
</script>
<template>
  <div class="latest -mt-4">
    <h4 class="my-6 border-b-1 border-gray-200 text-md pb-3">فروختنی ها</h4>
    <div v-if="loading" role="status" class="max-w-full animate-pulse">
      <div class="h-2 bg-gray-300 rounded-full w-full mb-7"></div>
      <div class="h-2 bg-gray-300 rounded-full w-full mb-7"></div>
    </div>
    <ul v-else class="text-lg">
      <li v-for="item in items" :key="item.tokenId" class="mb-2">
        {{ item.name }}
        <span class="font-thin mr-2"> / {{ item.description }} </span>
        <span class="font-thin mr-2"> / {{ `${item.price} Eth` }} </span>
        <button class="font-thin mr-2">/ خرید</button>
      </li>
    </ul>
  </div>
</template>
