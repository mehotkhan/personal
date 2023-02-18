<script lang="ts" setup>
import { ethers } from "ethers";
import { marketplaceAddress } from "../../config";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
const items = ref<any[]>([]);
const loadNFTs = async () => {
  // const provider = new ethers.providers.JsonRpcProvider();
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com"
  );

  const contract = new ethers.Contract(
    marketplaceAddress,
    NFTMarketplace.abi,
    provider
  );
  const data = await contract.fetchMarketItems();

  /*
   *  map over items returned from smart contract and format
   *  them as well as fetch their token metadata
   */
  Promise.all(
    data.map(async (i: any) => {
      try {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        console.log(tokenUri);
        items.value.push({
          price,
          tokenUri,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
        });
      } catch (error) {}
    })
  );
};

onMounted(() => {
  loadNFTs();
});
console.log(items);
</script>
<template>
  <div class="latest -mt-4">
    <h3>جدیدترین NFT ها</h3>
    <hr />
    <ul>
      <li v-for="item in items" :key="item.tokenId" class="mb-2">
        {{ item.tokenUri }}
        <span class="font-thin"> / {{ `${item.price} Eth` }} </span>
      </li>
    </ul>
  </div>
</template>
