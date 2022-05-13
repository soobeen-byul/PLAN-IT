<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>

import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'



export default {
    components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
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
  }
}
</script>

<style>
  body {
    font-family: 'NanumSquare';
    font-size: 1.2rem;

    text-align: center;
    background-color: #F6F6F8;

    min-height: 100%;
    position:relative;
    padding-bottom: 170px;
  }
  input {
    font-family: 'NanumSquare';
    font-size:1rem;
    font-weight: 300;
    border-style: groove;
    width: 200px;
  }
  button {
    color: rgb(102, 103, 171);
    border-style: solid;
    width: 7.5rem;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }






</style>
