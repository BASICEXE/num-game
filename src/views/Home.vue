<template>
  <div class="home">
    <h1 class="title">数あてゲーム</h1>
    <div class="gameInfo">
      <p class="gameInfo__text">4桁の数値を入力し、数を当ててください。</p>
      <!-- <p>CLEAR回数：{{ gameCount.hit }}回</p> -->
      <!-- <p>ゲーム回数：{{ gameCount.game }}回</p> -->
      <p>トライ回数：{{ gameCount.blow }}回</p>
    </div>
    <input type="text" ref="userNum" class="userNum" v-model="userNum" placeholder="1234" @keyup.enter="btnAnswer" />
    <p class="errorMessage">{{ gameInfo.errorMessage }}</p>
    <div class="btnWap">
      <a
        class="btn btn--answer"
        @click="btnAnswer"
        :class="{ 'btn--stop': !sendFlag }"
        >アンサー</a
      >
    </div>
    <div class="btnWap">
      <a class="btn" @click="initGame()">リスタート</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted: function() {
    this.initGame();
    this.$refs.userNum.focus();
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
        this.gameInfo.errorMessage = "数値を入力してください。";
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
  methods: {
    initGame() {
      this.gameCount.game = 0;
      this.gameCount.hit = 0;
      this.gameCount.blow = 0;
      this.gameInfo.errorMessage = "";
      this.$store.commit("systemMessage", "");
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
        this.$store.commit("systemMessage", "GAME CLEAR !!");
      } else {
        this.gameInfo.errorMessage = "ハズレ...。";
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
