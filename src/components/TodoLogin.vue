<template>
    <div class="login">
        <h1> <img class="flowerlogo" src='../assets/flower.png' style="height: 30px">PLAN IT<img class="flowerlogo" src='../assets/flower.png' style="height: 30px"></h1>
        <p class="text">EMAIL</p><input class="inputemail" v-model="email" placeholder="이메일을 입력하세요">
        <br>
        <p class="text">PASSWORD</p><input class="inputpassword" v-model="password" placeholder="비밀번호를 입력하세요">
        <br>
        <span class="goSignupbtn" @click="addUser"> 회원가입 </span>
        <span class="goIDsearchbtn"> 아이디찾기 </span>
        <br>
        <span class="goContentsbtn" @click="login"> 입장하기 </span>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged  
} from "firebase/auth";



export default {
  data() {
    return {
      msg: "hi",
      auth: getAuth(),
      email: "",
      password: ""
    };
  },
  methods: {
    addUser(){
        try {


        createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
            console.log(userCredential)
            var email=this.email
            this.$store.commit('addUserInfo',email)

          }                   
          // ...
        )
        .catch((error) => {
          this.msg = error;
        });     
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          this.name = userCredential.user.email;          
        })
        .catch((error) => {
          this.msg = error;
        });
    },
  },
  beforeCreate() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.$router.push({ path: "todo" }).catch(()=>{});
      } else {
        console.log("not logged in");
      }
    });
  },
};
</script>

<style>
.login{
  margin-top:40%;
}
h1{
  font-family: 'NanumBaReunHiPi';
}
.text{
  font-family: 'NanumBaReunHiPi';
}
.inputemail{
  font-family: 'NanumBaReunHiPi';

}
.inputpassword{
  font-family: 'NanumBaReunHiPi';

}
.goSignupbtn,.goIDsearchbtn{
    font-size: 13px;
    font-family: 'nanum-square';
    line-height: 40px;
    color: rgb(102, 103, 171);
    float:none;
    border-radius: 5px;
    text-decoration: underline;
}
.goContentsbtn{
    font-family: 'nanum-square';
    line-height: 40px;
    width: 80px;
    color: rgb(102, 103, 171);
    border-radius: 5px;
    border-style: solid;
}
    
</style>