<template>
  <header @:today="today">
    <input type="checkbox" id="menuicon">
      <label for="menuicon">  
        <span></span>
        <span></span>
        <span></span>
      </label>
    <div class="sidebar">
      <img class="profile" src="../assets/seed.png"> 
       {{name}}
      <span class="logoutbtn" @click="logout"> 로그아웃</span>
      <p> 친구 목록 </p>
      <p> 작고 소소한 미션 <span class="far fa-question-circle"> </span> </p>
      <span>오늘의 미션 하러가기 <span class="fas fa-camera"> </span></span>
      <span>모아보기</span>
      <p>설정</p>
      <span class="fas fa-user-edit"> 계정 </span>
      <span class="fas fa-bell"> 알림</span>
    </div>
    <h1> <img class="flowerlogo" src='../assets/flower.png'>PLAN IT<img class="flowerlogo" src='../assets/flower.png'></h1>
    <div class="today-header">
      <h2>
        <span class="leftpageBtn fas fa-angle-left" type="Button"  @click="downDate()"></span>     
        {{propsDate}}     
        <span class="rightpageBtn fas fa-angle-right" type="Button" @click="upDate()"></span>
      </h2>
      <h6 class="today-time">오늘은 {{ today.day}} {{' '}}{{today.date}} {{ today.time }}</h6>
    </div>

  </header>
</template>

<script>
import {getAuth,onAuthStateChanged} from "firebase/auth";


var days = ["두려움의 일요일", "고통의 월요일", "절망의 화요일", "인내의 수요일", "희망의 목요일", "환희의 금요일", "쾌락의 토요일"];
export default {
  props: 
   ['propsDate'],
  //   {
  //   state: {
  //     type: Object,
  //   },
  // },
  data() {
    return {
      today: {},
      auth: getAuth(),
      name:''
    };
  },
  created() {
    setInterval(() => {
      this.today = this.getTime();
    }, 1000);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        console.log(this.name)
        // ...
      } else {
        this.$router.replace({ path: "/" });
        // ...
      }
    });
  },

  methods: {
    logout(){
      this.user='';
      console.log(this.name)
    },
    getTime() {
      var now = new Date();
      // var year = now.getFullYear();
      var month = this.setTwoDigits(1 + now.getMonth());
      var dateValue = this.setTwoDigits(now.getDate());
      var day = days[now.getDay()];
      var time =
        this.setAMPM(now.getHours()) +
        ":" +
        this.setTwoDigits(now.getMinutes()) 
        // ":" +
        // this.setTwoDigits(now.getSeconds());
      return { date: month + "월" + dateValue +'일',day, time };
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

    upDate(){
      this.$emit('upDate')

    },

    downDate(){
      this.$emit('downDate')


    }
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
  .today-time{
    line-height:170%
  }

  .today-header{
    color:rgba(102, 103, 171, 0.614);
    line-height: 50%;
  }
  .flowerlogo{
    height: 35px;
    width: 35px;
    vertical-align: middle;
  }
  input[id="menuicon"] {
    display: none;
  }
  input[id="menuicon"] + label {
    position: absolute;
    float: right;
    top: 0%;
    display: block;
    width: 30px;
    height: 25px;
    position: relative;
    cursor: pointer;
  }
  input[id="menuicon"] + label span {
    display: block;
    position: absolute;
    width: 80%;
    height: 5px;
    border-radius: 30px;
    background: rgba(133, 134, 193, 0.9);
    z-index: 1;
    /* transition: all .1s; */
  }
  input[id="menuicon"] + label span:nth-child(1) {
    top: 0;
  }
  input[id="menuicon"] + label span:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
  }
  input[id="menuicon"] + label span:nth-child(3) {
    bottom: 0;
  }
  input[id="menuicon"]:checked + label span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  input[id="menuicon"]:checked + label span:nth-child(2) {
    opacity: 0;
  }
  input[id="menuicon"]:checked + label span:nth-child(3) {
    bottom: 50%;
    transform:translateY(50%) rotate(-45deg);
  }
  div[class="sidebar"] {
    width:300px;
    height: 100%;
    background: rgb(237, 238, 255);
    position: fixed;
    top:0;
    right: -300px;
    transition: all .35s;
  }
  input[id="menuicon"]:checked + label + div {
    right:0;
  }
  .profile{
    background-color:white;
    border-radius: 70%;
    width:40px;
    line-height:50px;
    float:left;
  }

</style>
