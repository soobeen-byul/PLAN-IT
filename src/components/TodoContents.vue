<template>
  <div id="app">
    <TodoHeader :propsDate=nowDate @upDate="upDate" @downDate="downDate"></TodoHeader>
    <TodoInput :propsDate=nowDate></TodoInput>
    <TodoList :propsDate=nowDate :propsPage=nowPage></TodoList>
    <TodoFooter :propsDate=nowDate @pageToAll="pageToAll" @pageToDone="pageToDone" @pageToUndone="pageToUndone"></TodoFooter>

  </div>
</template>

<script>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoInput from "./TodoInput.vue";
import TodoFooter from "./TodoFooter.vue";
import { mapGetters } from 'vuex'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, getDoc,collection, query, getDocs } from '@firebase/firestore';


export default {  
  components: {
    TodoList,    
    TodoHeader,
    TodoInput,
    TodoFooter
  },

  data() {
    return {
      name: "",
      auth: getAuth(),
      nowDate:'',
      nowPage:undefined,
      // todoList:[],
      // categoryItems:[],
      // userInfo:[]


    };
  },

  methods: {
    upDate(){
      var year=Number(this.nowDate.split("-")[0])
      var month=Number(this.nowDate.split("-")[1])
      var date=Number(this.nowDate.split("-")[2])

      var newDate=new Date(year,month-1,date+1)
      this.nowDate=this.getFormatDate(newDate)

      // this.nowDate=this.nowDate.split("-")[0]+'-'+this.nowDate.split("-")[1]+'-'+String(Number(this.nowDate.split("-")[2])+1)
    },
    downDate(){
      var year=Number(this.nowDate.split("-")[0])
      var month=Number(this.nowDate.split("-")[1])
      var date=Number(this.nowDate.split("-")[2])

      var newDate=new Date(year,month-1,date-1)
      this.nowDate=this.getFormatDate(newDate)
    },
    getFormatDate(date){
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return  String(year + '-' + month + '-' + day);
    },

    pageToAll(){
      this.nowPage=undefined
    },
    pageToUndone(){
      this.nowPage=true
    },
    pageToDone(){
      this.nowPage=false
    },
    async getFireInfo(){

        var userInfo=[]
        var todoList=[]
        var categoryItems=[]

        const docRef1 = doc(getFirestore(), "users", getAuth().currentUser.email);
        const docUserInfo = await getDoc(docRef1);

        userInfo.push(docUserInfo.data().UserInfo)

        

        const q1=query(collection(getFirestore(), "users",getAuth().currentUser.email,'Todo'))
        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
          todoList.push(doc.data().TodoInfo)
        })  

        const q2=query(collection(getFirestore(), "users",getAuth().currentUser.email,'Category'))
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
          categoryItems.push(doc.data().cateInfo)
        })  
        this.$store.commit('getLocalData',{todoList,categoryItems,userInfo});

        // localStorage.setItem('testtodoList',JSON.stringify(this.testtodoList))
    }
  },
  
  created() {

    // categoryItems=[{category:"ToDo",categoryColor:'#6667ab'}]
    // todoList=[]
    
    // if (localStorage.length > 0) {

    //     for (var i = 0; i < localStorage.length; i++) {
    //       var Idx=localStorage.key(i)
    //       var item= JSON.parse(localStorage[Idx])

    //       if (Idx=='categoryItems'){
    //         var categoryItems=item
    //       }else {
    //         var todoList=item
    //       } 
    //     }  
    //   }

      // this.$store.commit('getLocalData',{categoryItems,todoList});

   
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.name = user.email;
        this.getFireInfo()
        // setInterval(() => {
        //   this.getFireInfo()
        //   }, 1000);


      } else {
        this.$router.replace({ path: "/" }).catch(()=>{});
      }
    });
    this.nowDate=this.getFormatDate(new Date())

  },
  computed:{
    ...mapGetters({
      'categoryItems':'getCate',
      'todoList':'getTodoList'
   })
  }


};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

