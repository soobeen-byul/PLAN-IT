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
      <p class="logoutbtn" @click="logout">로그아웃</p>
      <p class="fas fa-camera" @click="gotoMission">오늘의 미션 하러가기</p>
      <p>설정</p>
      <span class="fas fa-user-edit" @click="showEditInfoModal"> 계정 </span>
      <span class="fas fa-bell"> 알림</span>

    </div>
    <label class="weather">
      <div id="weather" class="weather"> {{weather.main}} </div>
    </label>
    <br>

    <h1> <img class="flowerlogo" src='../assets/flower.png'>PLAN IT<img class="flowerlogo" src='../assets/flower.png'></h1>
    <div class="today-header">
      <h2>
        <span class="leftpageBtn fas fa-angle-left" type="Button"  @click="downDate()"></span>     
        {{propsDate}}     
        <span class="rightpageBtn fas fa-angle-right" type="Button" @click="upDate()"></span>
      </h2>
      <h6 class="today-time">오늘은 {{ today.day}} {{' '}}{{today.date}} {{ today.time }}</h6>
    
    </div>
      <EditInfoModal v-if="TFEditInfoModal" @close="TFEditInfoModal = false">
        <h3 slot="header"><img class="profile" src="../assets/seed.png"> {{name}}</h3>
        <div slot="content">
          <span>별명</span>
          <input type="name" v-model="name">
        </div>
        <span slot="footer" class="closeModalBtn" @click="editName(name,email)">저장하기</span>
      </EditInfoModal>

  </header>
  
</template>

<script>
import {onAuthStateChanged} from "firebase/auth";
import EditInfoModal from './common/EditInfoModal.vue'
import {getAuth,signOut} from "firebase/auth";
import { mapGetters} from 'vuex'
// import { getFirestore} from '@firebase/firestore';
import { getFirestore, doc, getDoc,collection, query, getDocs } from '@firebase/firestore';

var days = ["두려움의 일요일", "고통의 월요일", "절망의 화요일", "인내의 수요일", "희망의 목요일", "환희의 금요일", "쾌락의 토요일"];

// 날씨 API //
const API_KEY = "91ec8d410db7b0c5b73ecc3dcf76935d"
function getWeather() {
  function onGeoOK(position) {
  
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then(Response => Response.json())
    .then(data => {
      const weather = document.getElementById("weather")
      console.log(data.weather[0].icon)
      if (data.weather[0].icon == "01d") {
        weather.className = 'fas fa-sun fa-lg'
      } else if (data.weather[0].icon == "01n") {
        weather.className = 'fas fa-moon fa-lg'
      } else if (data.weather[0].icon == "02d") {
        weather.className = 'fas fa-sun fa-lg'
      } else if (data.weather[0].icon == "02n") {
        weather.className = 'fas fa-moon fa-lg'
      }
      switch ((data.weather[0].icon).substr(0,2)) {
        case ("03") : case ("04") :
          weather.className = 'fa fa-cloud fa-lg';
          break;
        case ("09") : case ("10") :
          weather.className = 'fas fa-tint fa-lg';
          break;
        case ("11") :
          weather.className = 'fas fa-umbrella fa-lg';
          break;
        case ("13") :
          weather.className = 'fas fa-snowflake fa-lg';
          break;
        }
      });
} 

navigator.geolocation.getCurrentPosition(onGeoOK);
}
export default {
  computed:{
    ...mapGetters({
      'userInfo':'getUserInfo'
    })
  },
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
      name:'',
      email:'',

      db: getFirestore(),


      api_key: "91ec8d410db7b0c5b73ecc3dcf76935d",
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
      latitude: '',
      longitude: '',
      TFEditInfoModal: false
      
    };
  },
  created() {
    setInterval(() => {
      this.today = this.getTime();
      
    }, 1000);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.email = user.email;
        this.getFireInfo();
        // this.name = this.userInfo[0].name;
      } 
    });
    getWeather()
  },
  components:{
    EditInfoModal:EditInfoModal
  },


  methods: {
    async getFireInfo(){

        var userInfo=[]
        var todoList=[]
        var categoryItems=[]

        const docRef1 = doc(getFirestore(), "users", getAuth().currentUser.email);
        const docUserInfo = await getDoc(docRef1);
        if(docUserInfo.exists()){
            userInfo.push(docUserInfo.data().UserInfo)
        }
        
        const q1=query(collection(getFirestore(), "users",getAuth().currentUser.email,'Todo'))
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          if(doc.exists()){
            todoList.push(doc.data().TodoInfo)
          }
        })  
        const q2=query(collection(getFirestore(), "users",getAuth().currentUser.email,'Category'))
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          if(doc.exists()){
            categoryItems.push(doc.data().cateInfo)
          }
        })  

        this.$store.commit('getLocalData',{todoList,categoryItems,userInfo});},    
    editName(name,email){

      email=getAuth().currentUser.email
      this.$store.commit('editName',{name,email})
      this.TFEditInfoModal = false

    },

    logout(){
      signOut(this.auth)
      .then(() => {

    });
    },
    showEditInfoModal(){
      this.email=getAuth().currentUser.email
      this.TFEditInfoModal=!this.TFEditInfoModal
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
    },

    gotoMission(){
      this.$router.push({ path: "/mission" })
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
    margin: 0.4rem 0rem 1rem;
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
  .fa-cloud {
    color:lightblue
  }
  .fa-clouds {
    color:lightblue
  }
  .fa-tint {
    color:cornflowerblue
  }
  .fa-cloud-shower {
    color: rgb(140, 152, 176)
  }
  .fa-sun {
    color: rgba(248, 137, 106, 0.803)
  }
  .fa-moon {
    color: rgb(238, 226, 95)
  }
  .fa-bolt {
    color: rgb(238, 226, 95)
  }
  .weather {
    float: right;
    margin: 0.4rem 1rem 1rem;
  }

</style>
