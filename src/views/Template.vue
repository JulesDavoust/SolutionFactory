<template>
    <div class="container">
      <div class="rectangle"></div>
    </div>
  </template>
  
  <style>
  .container {
    width: 100vw; /* 100% viewport width */
    height: 100vh; /* 100% viewport height */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .rectangle {
    width: 100%;
    height: 100%;
    background-color: #999999; /* Gray color */
  }
  </style>
  
  <script>
export default {
  name: "Template",
  components: {},
  props: {},
  data() {
    // quickfix to have components available to pass as props
    return {};
  },
};
</script>