<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addCategory="addCategory" v-on:addNewCategory="addNewCategory" v-bind:propsCate="categoryItems"></TodoInput>
    <TodoList v-bind:propsdata="todoItems"  v-bind:propsIdx="todoItems_Idx" v-bind:propsDone="doneItems" v-bind:propsCate="categoryItems" v-bind:propsDate="ddate" v-bind:propsTodoCate="todoCate" @removeTodo="removeTodo" @editTodo="editTodo" @updateState="updateState" @editCategory="editCategory" @clearCategory="clearCategory"></TodoList>
    <TodoFooter v-on:removeAll="clearAll" v-bind:propsDone="doneItems"></TodoFooter>
  </div>
</template>

<script>

import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'



export default {
  data() {
    return {
      todoItems: [],
      todoItems_Idx: [],
      doneItems : [],
      categoryItems: [],
      ddate: [],
      todoCate : []
    
    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
      this.todoItems_Idx= [];
      this.doneItems= [];
      this.ddate= [];
      localStorage.setItem("category",JSON.stringify(this.categoryItems));
    
    },
		addCategory(keyIdx,todoItem) {
			localStorage.setItem(keyIdx, JSON.stringify(todoItem));
			this.todoItems.push(todoItem.todo);
      this.todoItems_Idx.push(keyIdx);
      this.doneItems.push(todoItem.done);
      this.ddate.push(todoItem.dday);
      this.todoCate.push(todoItem.category)
		},
    addNewCategory(newCategory){
      this.categoryItems.push(newCategory);
      localStorage.setItem("category",JSON.stringify(this.categoryItems));
    },

    removeTodo(keyIdx,index) {
      localStorage.removeItem(keyIdx);
      this.todoItems.splice(index, 1);
      this.todoItems_Idx.splice(index, 1);
      this.doneItems.splice(index, 1);
      this.ddate.splice(index, 1);
    },
    editTodo(keyIdx,index,editedTodoItem){
        var savedItems=JSON.parse(localStorage.getItem(keyIdx))
        savedItems.todo=editedTodoItem
        this.todoItems.splice(index,1,editedTodoItem)
        localStorage.setItem(keyIdx,JSON.stringify(savedItems))
      
      },
    updateState(keyIdx,index){
      var items=JSON.parse(localStorage.getItem(keyIdx))
      items.done=!items.done
      if (items.done == true) {
        items.dday = ''
      }
      localStorage.setItem(keyIdx,JSON.stringify(items))
      
      this.doneItems.splice(index,1,!this.doneItems[index])
    },
    editCategory(editpastCate,editedCate){

      for (var n=0; n<this.categoryItems.length;n++){
        if(this.categoryItems[n]==editpastCate){
          this.categoryItems[n]=editedCate
        }
      }
      localStorage.setItem('category',JSON.stringify( this.categoryItems))
     
      for (var i=0;i<localStorage.length-1;i++){
        if (this.todoCate[i]==editpastCate){
          var items=JSON.parse(localStorage.getItem(this.todoItems_Idx[i]))
          items.category=editedCate
          localStorage.setItem(this.todoItems_Idx[i],JSON.stringify(items))
        }
      }
      location.reload();
    },
    clearCategory(clearCate){
      for (var n=0; n<this.categoryItems.length;n++){
        if(this.categoryItems[n]==clearCate){
          this.categoryItems.splice(n,1)
        }
      }
      localStorage.setItem('category',JSON.stringify(this.categoryItems))
      
      if (this.categoryItems==''){
        localStorage.removeItem('category')
      }
      for (var i=0;i<this.todoCate.length;i++){
        if (this.todoCate[i]==clearCate){
          localStorage.removeItem(this.todoItems_Idx[i])
        }
      }
      this.reloading()

    },
    reloading(){
      this.todoItems=[]
      this.todoItems_Idx=[]
      this.doneItems=[]
      this.categoryItems=[]
      this.ddate=[]
      this.todoCate=[]

      if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        var Idx=localStorage.key(i)
        var item= JSON.parse(localStorage[Idx])
        if (Idx=='category'){
          this.categoryItems=item
        }
        else {
          this.todoItems_Idx.push(Idx)
    
          this.todoItems.push(item.todo);
          this.doneItems.push(item.done)
          this.ddate.push(item.dday)
          this.todoCate.push(item.category)

        }
			}
      
    }


    }
    

  },
  created() {

	if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        var Idx=localStorage.key(i)
        var item= JSON.parse(localStorage[Idx])
        if (Idx=='category'){
          this.categoryItems=item
        }
        else {
          this.todoItems_Idx.push(Idx)
    
          this.todoItems.push(item.todo);
          this.doneItems.push(item.done)
          this.ddate.push(item.dday)
          this.todoCate.push(item.category)

        }
			}
      
    }
  },
    components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
    }
  
}
</script>

<style>
  body {
    text-align: center;
    background-color: #F6F6F8;

    min-height: 100%;
    position:relative;
    padding-bottom: 170px;
  }
  input {
    border-style: groove;
    width: 200px;
  }
  button {
    border-style: groove;
  }
  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
  }
</style>
