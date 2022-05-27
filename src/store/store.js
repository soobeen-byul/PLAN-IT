import Vue from 'vue';
import Vuex from 'vuex';
import {getFirestore,doc,setDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";

Vue.use(Vuex);


export const store = new Vuex.Store({
    state: {
        categoryItems: [],
        todoList:[],
        userInfo:[]
    },

    getters:{
        getCate : state => {
            return state.categoryItems
        },
        getTodoList : state=>{
            return state.todoList
        },
        getUserInfo: state=> {
            return state.userInfo
        }
       
    },

    mutations:{
        addTodo : (state,payload) => {

            var items={
                keyIdx:payload.keyIdx,
                task :payload.value,
                todoDate : payload.todoDate,
                done : false , 
                dday: payload.dday, 
                place: '', 
                memo: '', 
                category: payload.category, 
                alarm: ''
            }

            state.todoList.push(items)
            localStorage.setItem('TodoList',JSON.stringify(state.todoList))

            var user = getAuth().currentUser.email;
            var db=getFirestore();

            var docInfoData={
                TodoInfo : {
                    keyIdx:payload.keyIdx,
                    task :payload.value,
                    todoDate : payload.todoDate,
                    done : false , 
                    dday: payload.dday, 
                    place: '', 
                    memo: '', 
                    category: payload.category, 
                    alarm: ''
                }
                
              }
              var docFolder = doc(db,'users',user,'Todo',payload.value);
              setDoc(docFolder , docInfoData);
		},

        addNewCategory : (state,payload) => {
            var items ={
                category:payload.newCategory,
                categoryColor:payload.newCategoryColor
            }

            state.categoryItems.push(items)
            localStorage.setItem("categoryItems",JSON.stringify(state.categoryItems));

            var user = getAuth().currentUser.email;
            var db=getFirestore();
            var docInfoData={
                cateInfo : {
                    category:payload.newCategory,
                    categoryColor:payload.newCategoryColor
                }                
              }
            var docFolder = doc(db,'users',user,'Category',payload.newCategory);
            setDoc(docFolder , docInfoData);
        
        },

        clearAll : (state) => {
            localStorage.clear();
            state.todoList=[];
            localStorage.setItem("categoryItems",JSON.stringify(state.categoryItems));

        },

        removeTodo: (state,keyIdx) => {

            state.todoList=state.todoList.filter(todo => todo.keyIdx !== keyIdx)
            localStorage.setItem('TodoList',JSON.stringify(state.todoList))
    
        },

        editTodo : (state,payload)=>{

            let todo=state.todoList.filter(todo => todo.keyIdx === payload.keyIdx)[0]
            todo.task=payload.value

            localStorage.setItem('TodoList',JSON.stringify(state.todoList))
          
        },
        
        addDetailTodo : (state,payload) => {

            let todo=state.todoList.filter(todo => todo.keyIdx === payload.keyIdx)[0]

            todo.todoDate=payload.todoDate
            todo.dday=payload.dday
            todo.place=payload.place
            todo.memo=payload.memo
            todo.category=payload.category
            todo.alarm=payload.alarm
            
            localStorage.setItem('TodoList',JSON.stringify(state.todoList))

        },

        updateState : (state,keyIdx) => {

                let todo=state.todoList.filter(todo => todo.keyIdx === keyIdx)[0]
                todo.done =! todo.done

                localStorage.setItem('TodoList',JSON.stringify(state.todoList))
        },
        
        editCategory : (state,payload)=>{
            for (var n=0; n<state.categoryItems.length;n++){
              if(state.categoryItems[n].category==payload.editpastCate){
                state.categoryItems[n].category=payload.editedCate
              }
            }
            localStorage.setItem('categoryItems',JSON.stringify(state.categoryItems))

            let todos=state.todoList.filter(todo => todo.category === payload.editpastCate)

            for (var i=0; i<todos.length;i++) {
                todos[i].category=payload.editedCate
            }

            localStorage.setItem('TodoList',JSON.stringify(state.todoList))


        },

        clearCategory: (state,clearCate) => {

            state.categoryItems=state.categoryItems.filter(cate => cate.category !== clearCate)

            localStorage.setItem('categoryItems',JSON.stringify(state.categoryItems))

            state.todoList=state.todoList.filter(todo => todo.category !== clearCate)
            localStorage.setItem('TodoList',JSON.stringify(state.todoList))

        },

        getLocalData : (state,payload)=>{
            state.todoList=payload.todoList
            state.categoryItems=payload.categoryItems
        },
        addUserInfo: (state,email) => {
            var info={
                email:email
            }
            state.userInfo.push(info)
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))

            var user = getAuth().currentUser.email;
            var db=getFirestore();

            var docInfoData={
              UserInfo : {
                  email:info.email ,
                  keyIdx: Date.now(),
                  name:''
              }
              
            }
            var docFolder = doc(db,'users',user);
            setDoc(docFolder , docInfoData);
        }
    }
});

