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
      password: "",
      // displayName: "",
      // phoneNumber: "",
      // photoURL: "",
      // providerId:"",
      // uid: "",
    };
  },
  methods: {
    addUser() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
            console.log(this.userCredential)
          // Signed in
          // var user = userCredential.user;
          this.msg = "loggined as " + userCredential.user.email;                    
          // ...
        })
        .catch((error) => {
          this.msg = error;
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    },
    login() {
        console.log(this.auth)
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential.user);
          this.name = userCredential.user.email;          
          // ...
        })
        .catch((error) => {
          this.msg = error;
        });
    },
  },
  beforeCreate() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.email);
        this.$router.push({ path: "todo" });
        // ...
      } else {
        console.log("not logged in");
        // User is signed out
        // ...
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