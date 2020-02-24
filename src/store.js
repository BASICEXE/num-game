import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systemMessage: ""
  },
  getters: {
    systemMessage: state => {
      console.log(state.systemMessage);
      return state.systemMessage;
    }
  },
  mutations: {
    systemMessage(state, message) {
      console.log("mutations.systemMessage", state.systemMessage);
      state.systemMessage = message;
    }
  },
  actions: {}
});
