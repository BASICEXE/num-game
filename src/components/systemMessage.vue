<template>
  <div class="hello" v-if="isSystemMessage($store.getters.systemMessage)">
    <h1>{{ $store.getters.systemMessage }}</h1>
  </div>
</template>

<script>
export default {
  name: "systemMessage",
  methods: {
    isSystemMessage(message) {
      if (message.length) return true;
      return false;
    },
  }
};
</script>
