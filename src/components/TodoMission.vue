<template>
  <div class="calendar-vue" >
    <h5 class="fas fa-arrow-left" @click=gotoHome()></h5>
    <h1> <img class="flowerlogo" src='../assets/flower.png'> 이 달의 미션 <img class="flowerlogo" src='../assets/flower.png'></h1>
      <h2>
        <span v-on:click="onClickPrev(currentMonth)" class="leftpageBtn fas fa-angle-left" type="Button"></span>
        {{currentYear}}년 {{currentMonth}}월
        <span v-on:click="onClickNext(currentMonth)" class="leftpageBtn fas fa-angle-right" type="Button"></span>
      </h2>
      <table class="table table-hover" style="margin-left:auto;margin-right:auto;">
          <thead>
            <tr>
              <td v-for="(weekName, index) in weekNames" v-bind:key="index">
                {{weekName}}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in currentCalendarMatrix" :key="index" >
              <td v-for="(day, index2) in row" :key="index2" style="padding:20px;">
                <span v-if=missionClearorNot[day-1] :style={color:style_color[index2]} >
                  <i class="fas fa-heart" />
                </span>
                <span v-else>
                  {{day}}
                </span>
              </td>
            </tr>
          </tbody>
      </table >
    <!-- <h2> <img class="flowerlogo" src='../assets/flower.png'> 오늘의 미션 <img class="flowerlogo" src='../assets/flower.png'></h2> -->
    <h1>오늘의 {{todayColorKor}}을 찾아보세요!</h1>
    <input ref="fileupload" type='file' v-on:change="handleChange">
    <div v-if="preview"><img v-bind:src="preview" width="90%" id="img"></div>
    <div><h4 class="fas fa-camera" @click="predict" >결과 확인하기</h4></div>
    <AlertModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">미션 결과</h3>
      <h2 slot="content">{{message}}</h2>
      <span slot="footer" class="closeModalBtn" @click="showModal = false">닫기</span>
    </AlertModal>
  </div>
  
</template>

<script>
import AlertModal from './common/AlertModal.vue'
import * as tmImage from '@teachablemachine/image';
export default {
  name: 'Calendar-vue',
  data () {
    return {
      weekNames: ["Mon", "Tue", "Wed","Thu", "Fri", "Sat", "Sun"],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth()+1,
      currentDay: new Date().getDate(),
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [],
      model : null,
      todayColor:'',
      todayColorKor:'',
      // src : '',
      preview:'',
      todayMissionClear:false,
      missionClearorNot:[],
      currentMissionMatrix:[],
      missionList :[],
      style_color : ['#FF4848','#FFBB00','#FFE400','#B1DB4E','#6799FF','#4C4C4C','#D5D5D5'],
      message: "",
      showModal:false
    }
  },
  async mounted(){
      this.init();

      let baseURL = "https://teachablemachine.withgoogle.com/models/s0-qNJQBZ/";
      this.model = await tmImage.load(
      baseURL + "model.json",
      baseURL + "metadata.json" );
  },
  methods: {
      init:function(){
        this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
        this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
        this.initCalendar();
      },
      initCalendar:function(){
        this.currentCalendarMatrix = [];
        this.currentMissionMatrix=[];
        this.getmonthMission ()
        let day=1;
        for(let i=0; i<6; i++){
          let calendarRow = [];
          let missionRow=[];
          for(let j=0; j<7; j++){
            if(i==0 && j<this.currentMonthStartWeekIndex){
              calendarRow.push("");
              missionRow.push("")
            }
            else if(day<=this.endOfDay){
              calendarRow.push(day);
              calendarRow.push()
              day++;
            }
            else{
              calendarRow.push("");
            }
          }
          this.currentCalendarMatrix.push(calendarRow);
        }
      },
      getEndOfDay: function(year, month){
        let date= 0
          switch(month){
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                date = 31
                break;
              case 4:
              case 6:
              case 9:
              case 11:
                date = 30
                break;
              case 2:
                if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
                date = 29 
                }
                else{
                    date = 28
                }
                break;
              default:
                date =0
                break;
          }
        return date
      },
      getStartWeek: function(targetYear, targetMonth){
        let year = this.rootYear;
        let month = 1;
        let sumOfDay = this.rootDayOfWeekIndex;
        let cond = (targetYear !== year) && (targetMonth !== month)
        while(cond){
          if(targetYear > year){
            for(let i=0; i<12; i++){
              sumOfDay += this.getEndOfDay(year, month+i);
            }
            year++;
          }
          else if(targetYear == year){
            if(targetMonth > month){
              sumOfDay += this.getEndOfDay(year, month);
              month++;
            }
            else if(targetMonth == month){
              return (sumOfDay)%7;
            }
          }
        }
      },
      onClickPrev: function(month){
        month--;
        if(month<=0){
          this.currentMonth = 12;
          this.currentYear -= 1;
        }
        else{
          this.currentMonth -= 1;
        }
        this.init();
      },
      onClickNext: function(month){
        month++;
        if(month>12){
          this.currentMonth = 1;
          this.currentYear += 1;
        }
        else{
          this.currentMonth += 1;
        }
        this.init();
      },
      isToday: function(year, month, day){
        let date = new Date();
        return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
      },

    handleChange: function (event) {
      var file = event.target.files[0]
      if (file && file.type.match(/^image\/(png|jpeg)$/)) {
        this.preview = window.URL.createObjectURL(file)
      }
    },
    getmonthMission (){
      let check_mission=this.missionList.filter((missionClearorNot => missionClearorNot.year == this.currentYear)
      && (missionClearorNot => missionClearorNot.month == this.currentMonth))[0]

      if (check_mission ==undefined){
        this.missionClearorNot=[]

        let end=this.getEndOfDay(this.currentYear, this.currentMonth)
          for (let i=0 ;i<end;i++){
            this.missionClearorNot.push(false)
          }
        var items = { year : this.currentYear,
                      month : this.currentMonth,
                      clear : this.missionClearorNot} 
        this.missionList.push(items)
        localStorage.setItem('missionList',JSON.stringify(this.missionList))
        }else {
          this.missionClearorNot=check_mission.clear
        }
    
    },
    async predict() {
      const img = document.getElementById("img");

      let prediction = await this.model.predictTopK(
        img,
        1,
        true
      );

      let predicted = prediction[0].className;
      this.todayMissionClear=false;

      if (predicted == this.todayColor) {
        this.message = "오늘의 미션 성공!"
        this.todayMissionClear = true;
        var today=new Date()
        var year=today.getFullYear()
        var month=today.getMonth() + 1
        var day = today.getDate()

        this.missionClearorNot[day-1]=true
        var items = { year : year,
                      month : month,
                      clear : this.missionClearorNot
        }
  
        let newMissionList=this.missionList.filter((newmissionList => newmissionList.year !== this.currentYear)
      && (newmissionList => newmissionList.month !== this.currentMonth))

        newMissionList.push(items)
        localStorage.setItem('missionList',JSON.stringify(newMissionList))

      } else{
        this.message=predicted+' 입니다ㅠㅠ 다시 도전해주세요!'

      }
      this.showModal=true
      this.init()
    },
    gotoHome(){
      this.$router.push({ path: '/todo' })
    }
  },
  created(){
    let week_color = ['red','orange','yellow','green','blue','black','white']
    let color_kor= ['빨강','주황','노랑','초록','파랑','검정','하양']
    let currentDayofWeek = new Date().getDay()-1

    this.todayColor = week_color[currentDayofWeek]
    this.todayColorKor=color_kor[currentDayofWeek]
    
    for (var i = 0; i < localStorage.length; i++) {
          var Idx=localStorage.key(i)
          var item= JSON.parse(localStorage[Idx])

          if (Idx=='missionList'){
            this.missionList = item
        }
      }
    if (this.missionList.length==0){
      let end=this.getEndOfDay(this.currentYear, this.currentMonth)
          for (let i=0 ;i<end;i++){
            this.missionClearorNot.push(false)
          }
      var items = { year : this.currentYear,
                      month : this.currentMonth,
                      clear : this.missionClearorNot
        }
      this.missionList.push(items)
      localStorage.setItem('missionList',JSON.stringify(this.missionList))
    }
  },
  components: {
    AlertModal: AlertModal
  },
}
</script>

<style type="text/css">
  h1 {
    color: rgb(102, 103, 171);
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
  h2{
    /* color: rgba(102, 103, 171, 0.829); */
    font-weight: 900;
  }
  .fa-arrow-left{
    float:left;
    height: 50px;
    width: 50px;
  }
  .flowerlogo{
    height: 35px;
    width: 35px;
    vertical-align: middle;
  }

  .fa-heart{
    font-size:30px;
    
  }
  
    
</style>