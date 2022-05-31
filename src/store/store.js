import Vue from 'vue';
import Vuex from 'vuex';
import {getFirestore,doc,setDoc,deleteDoc,updateDoc} from "firebase/firestore";
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
            var user = getAuth().currentUser.email;
            var db=getFirestore();
  
            for (var i of state.todoList) {
                var docFolder=doc(db,'users',user,'Todo',i.task)
                deleteDoc(docFolder)
              }

            localStorage.clear();
            state.todoList=[];
            localStorage.setItem("categoryItems",JSON.stringify(state.categoryItems));





        },

        removeTodo: (state,keyIdx) => {
            var user = getAuth().currentUser.email;
            var db=getFirestore();
            for (var i of state.todoList) {
                if (i.keyIdx==keyIdx){
                    var ivalue=i.task
                }
              }
            var docFolder=doc(db,'users',user,'Todo',ivalue)
            deleteDoc(docFolder)             
            state.todoList=state.todoList.filter(todo => todo.keyIdx !== keyIdx)
            localStorage.setItem('TodoList',JSON.stringify(state.todoList))
        },

        editTodo : (state,payload)=>{
            var user = getAuth().currentUser.email;
            var db=getFirestore();
            //삭제
            for (var i of state.todoList) {
                if (i.keyIdx==payload.keyIdx){
                    var ivalue=i.task
                }
              }
            var docFolder1=doc(db,'users',user,'Todo',ivalue)
            deleteDoc(docFolder1)             
            // 추가
            for (var j of state.todoList) {
                if (j.keyIdx==payload.keyIdx){
                    var docInfoData={
                        TodoInfo : {
                            keyIdx:j.keyIdx,
                            task :payload.value,
                            todoDate : j.todoDate,
                            done : false , 
                            dday: j.dday, 
                            place: '', 
                            memo: '', 
                            category: j.category, 
                            alarm: ''
                        }
                      }
                    
                      var docFolder2 = doc(db,'users',user,'Todo',payload.value);
                      setDoc(docFolder2 , docInfoData);
            let todo=state.todoList.filter(todo => todo.keyIdx === payload.keyIdx)[0]
            console.log(todo,111)
            todo.task=payload.value
            console.log(todo.task,222)

            localStorage.setItem('TodoList',JSON.stringify(state.todoList))
                    
                }
              }
          
        },
        
        addDetailTodo : (state,payload) => {
            var user = getAuth().currentUser.email;
            var db=getFirestore();

            let todo=state.todoList.filter(todo => todo.keyIdx === payload.keyIdx)[0]

            todo.todoDate=payload.todoDate
            todo.dday=payload.dday
            todo.place=payload.place
            todo.memo=payload.memo
            todo.category=payload.category
            todo.alarm=payload.alarm
            todo.task=payload.task

            var docInfoData={
                TodoInfo : {
                    keyIdx:payload.keyIdx,
                    task :payload.task,
                    todoDate : payload.todoDate,
                    done : false , 
                    dday: payload.dday, 
                    place: payload.place, 
                    memo: payload.memo, 
                    category: payload.category, 
                    alarm: payload.alarm
                }
              }
            var docFolder = doc(db,'users',user,'Todo',payload.task);
            setDoc(docFolder , docInfoData);
            
            localStorage.setItem('TodoList',JSON.stringify(state.todoList))

        },

        updateState : (state,keyIdx) => {
            var user = getAuth().currentUser.email;
            var db=getFirestore();

            let todo=state.todoList.filter(todo => todo.keyIdx === keyIdx)[0]

            todo.done =! todo.done


            var docInfoData={
                TodoInfo : {
                    keyIdx:todo.keyIdx,
                    task :todo.task,
                    todoDate : todo.todoDate,
                    done : todo.done , 
                    dday: todo.dday, 
                    place: todo.place, 
                    memo: todo.memo, 
                    category: todo.category, 
                    alarm: todo.alarm
                }
              }
            var docFolder = doc(db,'users',user,'Todo',todo.task);
            updateDoc(docFolder , docInfoData);


            localStorage.setItem('TodoList',JSON.stringify(state.todoList))
        },
        
        editCategory : (state,payload)=>{
            var user = getAuth().currentUser.email;
            var db=getFirestore();
            for (var n=0; n<state.categoryItems.length;n++){
              if(state.categoryItems[n].category==payload.editpastCate){
                state.categoryItems[n].category=payload.editedCate

                //삭제
                var docFolder1=doc(db,'users',user,'Category',payload.editpastCate)
                deleteDoc(docFolder1)
                //재저장    
                var docInfoData={
                    cateInfo : {
                        category:payload.editedCate,
                        // categoryColor:state.categoryItems[n].newCategoryColor
                    }                
                  }
                var docFolder2 = doc(db,'users',user,'Category',payload.editedCate);
                setDoc(docFolder2 , docInfoData);
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
            var user = getAuth().currentUser.email;
            var db=getFirestore();

            for (var i of state.categoryItems) {
                if (i.category==clearCate){
                    var docFolder1=doc(db,'users',user,'Category',i.category)
                    deleteDoc(docFolder1) 

                }
              }
            state.categoryItems=state.categoryItems.filter(cate => cate.category !== clearCate)

            localStorage.setItem('categoryItems',JSON.stringify(state.categoryItems))

            for (var j of state.todoList) {
                if (j.category==clearCate){
                    var docFolder2=doc(db,'users',user,'Todo',j.task)
                    deleteDoc(docFolder2) 

                }
              }

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

