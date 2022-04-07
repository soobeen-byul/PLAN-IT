<template>
  <header @:today="today">
    <h1> TODOLIST </h1>
    <div class="today-header">
      <h2>{{ today.date }}</h2>
      <p>오늘은 {{ today.day }} {{ today.time }}</p>
    </div>
  </header>
</template>

<script>
var days = ["두려움의 일요일", "고통의 월요일", "절망의 화요일", "인내의 수요일", "희망의 목요일", "환희의 금요일", "쾌락의 토요일"];
export default {
  props: {
    state: {
      type: Object,
    },
  },
  data() {
    return {
      today: {},
    };
  },
  created() {
    setInterval(() => {
      this.today = this.getTime();
    }, 1000);
  },
  methods: {
    getTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month = this.setTwoDigits(1 + now.getMonth());
      var dateValue = this.setTwoDigits(now.getDate());
      var day = days[now.getDay()];
      var time =
        this.setAMPM(now.getHours()) +
        ":" +
        this.setTwoDigits(now.getMinutes()) +
        ":" +
        this.setTwoDigits(now.getSeconds());
      return { date: year+"."+ month + "." + dateValue, day, time };
    },
    setTwoDigits(num) {
      if (num >= 10) {
        return num
      }
      else {
        return "0"+num
      }
    },
    setAMPM(num) {
      var sub = "AM ";
      if (num > 12) {
        sub = "PM ";
        num = num - 12;
      }
      return sub + this.setTwoDigits(num);
    },
  },
};
</script>

<style scoped>
  h1 {
    color: rgb(102, 103, 171);
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
  h2{
    color: rgba(102, 103, 171, 0.829);
    font-weight: 900;

  }
  .today-header{
    color:rgba(102, 103, 171, 0.614);
    line-height: 50%;



  }
</style>
