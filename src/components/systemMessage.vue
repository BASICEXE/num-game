<template>
  <div
    class="systemMessage"
    v-if="isSystemMessage($store.getters.systemMessage)"
  >
    <div class="systemMessage__inner">
      <p class="systemMessage__message">
        {{ $store.getters.systemMessage }}
      </p>
      <div class="btnWap">
        <a class="btn" @click="close()">Close</a>
      </div>
    </div>
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
    close() {
      this.$store.commit("systemMessage", "");
    },
  },
};
</script>
