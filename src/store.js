import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systemMessage: "",
  },
  getters: {
    systemMessage: (state) => {
      return state.systemMessage;
    },
  },
  mutations: {
    systemMessage(state, message) {
      state.systemMessage = message;
    },
  },
  actions: {},
});
