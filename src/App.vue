<template>
  <!-- <router-view /> -->
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "@/assets/scss/base.scss";
</style>
