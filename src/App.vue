<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems"  v-bind:propsIdx="todoItems_Idx" v-bind:propsDone="doneItems" v-bind:propsDate="ddate" @removeTodo="removeTodo" @editTodo="editTodo" @updateState="updateState"></TodoList>
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
      ddate: []
    
    }
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
      this.todoItems_Idx= [];
      this.doneItems= [];
      this.ddate= [];
    },
		addTodo(keyIdx,todoItem) {
			localStorage.setItem(keyIdx, JSON.stringify(todoItem));
			this.todoItems.push(todoItem.todo);
      this.todoItems_Idx.push(keyIdx);
      this.doneItems.push(todoItem.done);
      this.ddate.push(todoItem.dday);
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
        // this.todoItems[index]=editedTodoItem
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
      
    }

  },
  created() {
	if (localStorage.length > 0) {
			for (var i = 0; i < localStorage.length; i++) {
        var Idx=localStorage.key(i)
        this.todoItems_Idx.push(Idx)
    
        var item= JSON.parse(localStorage[Idx])
        this.todoItems.push(item.todo);
        this.doneItems.push(item.done)
        this.ddate.push(item.dday)
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
