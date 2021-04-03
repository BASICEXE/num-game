<template>
  <div id="app">
    <router-view />
    <systemMessage />
  </div>
</template>
<script>
import systemMessage from "./components/systemMessage.vue";
export default {
  components: {
    systemMessage,
  },
};
</script>
