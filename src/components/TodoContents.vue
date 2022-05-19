<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput ></TodoInput>
    <TodoList ></TodoList>
    <TodoFooter ></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./TodoHeader.vue";
import TodoList from "./TodoList.vue";
import TodoInput from "./TodoInput.vue";
import TodoFooter from "./TodoFooter.vue";
import { getAuth, onAuthStateChanged} from "firebase/auth";

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

    };
  },
  
  created() {

    categoryItems=[{category:"ToDo",categoryColor:'#6667ab'}]
    todoList=[]
    
    if (localStorage.length > 0) {

        for (var i = 0; i < localStorage.length; i++) {
          var Idx=localStorage.key(i)
          var item= JSON.parse(localStorage[Idx])

          if (Idx=='categoryItems'){
            var categoryItems=item
          }else {
            var todoList=item
          } 
        }  
      }

      this.$store.commit('getLocalData',{categoryItems,todoList});

   
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.name = user.email;
      } else {
        this.$router.replace({ path: "/" }).catch(()=>{});
      }
    });
  },
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

