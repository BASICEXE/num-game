<template>
  <div class="home">
    <h1 class="title">数あてゲーム</h1>
    <input type="text" class="userNum" v-model="userNum" placeholder="1234" />
    <p class="errorMessage">{{ gameInfo.errorMessage }}</p>
    <div class="gameInfo">
      <p>ゲーム数：{{ gameCount.game }}回</p>
      <p>ヒット数：{{ gameCount.hit }}回</p>
      <p>ブロー数：{{ gameCount.blow }}回</p>
    </div>
    <div class="btnWap">
      <a class="btn" v-on:click="initGame()">はじめから</a>
      <a
        class="btn btn--answer"
        v-on:click="btnAnswer"
        v-bind:class="{ 'btn--stop': !sendFlag }"
        >回答</a
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  mounted: function() {
    this.initGame();
  },
  data() {
    return {
      sendFlag: false,
      userNum: null,
      answer: null,
      gameCount: {
        game: 0,
        hit: 0,
        blow: 0
      },
      gameInfo: {
        errorMessage: ""
      }
    };
  },
  watch: {
    userNum() {
      if (!this.userNum) {
        this.sendFlag = false;
        return;
      }
      if (this.userNum.length > 4) {
        this.userNum = this.userNum.slice(0, -1);
      }
      if (!this.checkNumber(this.userNum)) {
        this.gameInfo.errorMessage = "半角英数を入力してください。";
        this.sendFlag = false;
        return;
      }
      if (this.checkDuplicate(this.userNum)) {
        this.gameInfo.errorMessage = "重複させないでください";
        this.sendFlag = false;
        return;
      }
      this.gameInfo.errorMessage = "";
      if (this.userNum.length == 4) this.sendFlag = true;
      return;
    }
  },
  computed: {},
  methods: {
    initGame() {
      this.gameCount.game = 0;
      this.gameCount.hit = 0;
      this.gameCount.blow = 0;
      this.gameInfo.errorMessage = "";
      (this.userNum = ""), this.makeAnswer();
    },
    randomNum(minNum, maxNum) {
      return Math.floor(Math.random() * (maxNum + 1 - minNum)) + minNum;
    },
    strDel(str, index) {
      return str.slice(0, index) + str.slice(index + 1);
    },
    makeAnswer() {
      let num = "0123456789";
      let str = "";
      for (let i = 0; i < 4; i++) {
        let index = this.randomNum(0, num.length - 1);
        str = str + num[index];
        num = this.strDel(num, index);
      }
      this.answer = str;
    },
    btnAnswer() {
      if (!this.sendFlag) return;
      let hit = this.userNum === this.answer;
      if (hit) {
        this.gameCount.hit++;
        this.makeAnswer();
      } else {
        this.gameCount.blow++;
      }
      this.gameCount.game++;
    },
    checkDuplicate(num) {
      let str = num;
      str = Array.from(str);
      let check = str.filter(function(x, i, self) {
        return self.indexOf(x) === i && i !== self.lastIndexOf(x);
      });
      if (check.length) return true;
      return false;
    },
    checkNumber(num) {
      let match = isNaN(num);
      if (!match) return true;
      return false;
    }
  }
};
</script>
