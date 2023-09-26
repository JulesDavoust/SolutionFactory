<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <!--<div id="app">
    <router-view></router-view>
    <Navbar />
  </div>-->
  <div id="app">
  <header>
    <Navbar />
  </header>
  <RouterView class="body" />
  </div>
</template>
