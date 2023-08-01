<script setup lang="ts"></script>
<template>
  <div>
    <div v-if="!isOwner()" class="flex items-center">
      <a href="https://github.com/mehotkhan" target="_blank">
        <IconUil:github-alt class="ml-3" />
      </a>
      <a href="https://www.linkedin.com/in/ali-zemani/" target="_blank">
        <IconUil:linkedin-alt class="ml-3" />
      </a>
      <a href="https://www.twitter.com/ZemaniAli/" target="_blank">
        <IconUil:twitter-alt class="ml-3" />
      </a>
      <IconUil:user class="ml-3" />
    </div>
    <div v-else class="flex items-center">
      <NuxtLink to="/manage">
        <IconUil:cog class="ml-3" />
      </NuxtLink>
      <IconUil:bell class="ml-3" />
    </div>
  </div>
</template>
