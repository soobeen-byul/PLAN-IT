<template>
  <section>
    <ol name="list_cate" >
      <div v-for="(cate,cateidx) in categoryItems" :key="cate+cateidx"> 
        <p :key="cateidx"> <span class='catebox' :style={color:cate.categoryColor}> {{cate.category}} </span>
          <span class="categorydetailBtn fas fa-cog" type="button" @click="showEditCategoryModal(cate.category)"></span>
        </p>
        <draggable>
          <transition-group name="list" tag="ul">
            <li v-for="(todoItem, index) in todoList" :key="todoItem+index" class="shadow" v-show='todoItem.category==cate.category & todoItem.todoDate==propsDate & todoItem.done!==propsPage'>
              <span type="button" aria-hidden="true" @click="updateState(todoItem.keyIdx)"><img v-if=todoItem.done src="..\src\assets\flower.png" width="25" height="25" align='center'><img v-else src="..\src\assets\seed.png" width="25" height="25" align='center'></span>
              <input :class="{textCompleted:todoItem.done}" style="outline: none;border-style: none;" :placeholder="todoItem.task" v-model="editedTodoItem[index]" @keyup.enter="editTodo(todoItem.keyIdx,index)">
              <div class="dday"> {{todoItem.dday}} </div>
              <span class="detailBtn" type="button" @click="showDetailModal(todoItem.keyIdx)">
                <i class="fas fa-ellipsis-v"></i>
              </span>
              <span class="removeBtn" type="button" @click="removeTodo(todoItem.keyIdx)">
                <i class="far fa-trash-alt" aria-hidden="true"></i>
              </span>
            </li>
          </transition-group></draggable>
    </div>
    </ol>
      <EditAlertModal v-if="showEditAlertModal" @close="showEditAlertModal = false">
        <h3 slot="header">경고</h3>
        <p slot="content">할 일을 입력하세요.</p>
        <span slot="footer" class="closeModalBtn" @click="showEditAlertModal = false">닫기</span>
      </EditAlertModal> 

      <DetailModal v-if="TFDetailModal" @close="TFDetailModal = false">
        <div slot="header">
          <h2> {{DetailTodo}} </h2></div>
        <div slot="content">
          <span style="padding-right:85px;float:none">카테고리 </span>
            <select class="categorybox" v-model="category">
              <option disabled value="" >카테고리를 선택하세요.</option>
              <option :key=cateIdx+cate :value=cate.category v-for="(cate,cateIdx) in categoryItems">{{cate.category}}</option>
            </select> 
          <br>날짜
            <input type="date" v-model="todoDate" style="float:right;">
          <br>장소
            <input type="text" v-model="place" style="float:right">
          <br>메모
            <input type="text" v-model="memo"  style="float:right">
          <br>알림
            <input type="time" v-model="alarm"  style="float:right">
        </div>
        <div slot="footer" style="margin-top:0;">
          <span class="saveDetailBtn" @click="addDetailTodo(DetailkeyIdx,todoDate,place,memo,category,alarm)">저장하기</span>
          <span class="closeDetailBtn" @click="TFDetailModal = false"> 닫기</span>
        </div>
      </DetailModal>

      <EditCategoryModal v-if="TFEditCategoryModal" @close="TFEditCategoryModal=false">
        <div slot="header">
          <h3 >{{editpastCate}}</h3>
        </div>
        
        <div slot="content">
          <input type="text" v-model="editedCate" placeholder="카테고리 이름 수정">
        </div>
        <div slot="footer">
          <span class="EditCategoryBtn" @click="editCategory()">수정하기</span>
          <span class="closeEditModalBtn fas fa-times" @click="TFEditCategoryModal = false"></span>
          <span class="DeleteCategoryBtn" @click="goAlertCategoryModal()">삭제하기</span>
        </div>
      </EditCategoryModal>

      <AlertCategoryModal v-if="TFAlertCategoryModal" @close="TFAlertCategoryModal=false">
        <h3 slot="header">{{editpastCate}} 항목을 정말 삭제하겠습니까?</h3>
        <div slot="footer">
          <span class="noAllDeleteBtn" @click="goEditCategoryModal()">닫기</span>
          <span class="allDeleteBtn" @click="clearCategory()">삭제하기</span>
        </div>            

      </AlertCategoryModal>
  </section>
</template>


<script>
import draggable from 'vuedraggable'

import DetailModal from './common/DetailModal.vue'
import EditAlertModal from './common/EditAlertModal.vue'
import EditCategoryModal from './common/EditCategoryModal.vue'
import AlertCategoryModal from './common/AlertCategoryModal.vue'
import { mapGetters } from 'vuex'


export default {
  props : ['propsDate','propsPage'],

  data(){
    return{
      TFDetailModal: false,
      showEditAlertModal: false,
      TFEditCategoryModal: false,
      TFAlertCategoryModal: false,
      DetailTodo: '',
      place:'',
      todoDate:'',
      memo:'',
      category:'',
      alarm:'',
      done:'',
      dday:'',
      editedTodoItem: [],
      editpastCate:'',
      editedCate:''
    }
  },
  

  methods: {
    removeTodo(keyIdx) {
      this.$store.commit('removeTodo',keyIdx);
    },
    updateState(keyIdx){
      this.$store.commit('updateState',keyIdx);
    },

    showDetailModal(keyIdx){
      this.TFDetailModal=!this.TFDetailModal
      this.DetailkeyIdx=keyIdx

      var items=this.todoList.filter(todo => todo.keyIdx === this.DetailkeyIdx)[0]
      this.DetailTodo=items.todo

      this.done=items.done
      this.place=items.place
      this.todoDate=items.todoDate
      this.memo=items.memo
      this.category=items.category
      this.alarm=items.alarm
      this.dday=items.dday
    },
    showEditCategoryModal(category){
      this.TFEditCategoryModal=!this.TFEditCategoryModal
      this.editpastCate=category

    },
    editCategory(){
      let editpastCate = this.editpastCate
      let editedCate=this.editedCate
      this.$store.commit('editCategory',{editpastCate,editedCate})
      this.TFEditCategoryModal=!this.TFEditCategoryModal
      this.editedCate=''
    },
    clearCategory(){
      this.$store.commit('clearCategory',this.editpastCate)
      this.TFAlertCategoryModal=!this.TFAlertCategoryModal;
    },
    goEditCategoryModal(){
      this.TFAlertCategoryModal=!this.TFAlertCategoryModal;
      this.TFEditCategoryModal=!this.TFEditCategoryModal;

    },
    goAlertCategoryModal(){
      this.TFAlertCategoryModal=!this.TFAlertCategoryModal;
      this.TFEditCategoryModal=!this.TFEditCategoryModal;
    },
    addDetailTodo(DetailkeyIdx){
      this.TFDetailModal=false
 
      if (this.todoDate !== '') {

        var today = new Date().getTime()
        var deaddate = new Date(this.todoDate.split("-")[0],this.todoDate.split("-")[1]-1,this.todoDate.split("-")[2]).getTime()
        this.dday = deaddate - today
        this.dday = Math.ceil((this.dday) / (1000*60*60*24))
        if (this.dday > 0) {
          this.dday="D-"+this.dday
        } else if (this.dday < 0) {
          this.dday=''
        } else {this.dday='D-day'}
      } else {this.dday=''}


      var todoitem = this.todoList.filter(todo => todo.keyIdx === DetailkeyIdx)[0]
      var task= todoitem.task
      var keyIdx= todoitem.keyIdx
      var done = this.done
      var todoDate = this.todoDate
      var dday = this.dday
      var place= this.place
      var memo = this.memo
      var category = this.category
      var alarm= this.alarm

      this.$store.commit('addDetailTodo',{task,keyIdx,done,todoDate,dday,place,memo,category,alarm})

      this.clearInput()

    },

    clearInput(){
      this.place='';
      this.todoDate='';
      this.done=''
      this.memo=''
      this.category=''
      this.alarm=''
      this.dday=''
    },

    editTodo(keyIdx,index){
      if (this.editedTodoItem[index] !== undefined) {
        var value = this.editedTodoItem[index] && this.editedTodoItem[index].trim();
       
				this.$store.commit('editTodo',{keyIdx,value})

        this.editedTodoItem= [];
      } else {
        this.showEditAlertModal=!this.showEditAlertModal
      }
    }
  },

  components: {
    DetailModal: DetailModal,
    EditAlertModal: EditAlertModal,
    EditCategoryModal: EditCategoryModal,
    AlertCategoryModal: AlertCategoryModal,
    draggable
  },

  computed:{
    ...mapGetters({
      'categoryItems':'getCate',
      'todoList':'getTodoList'
   })
  },

}
</script>

<style scope>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }
  li {
    display: flex;
    min-height: 50px;
    /* height: 50px; */
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
  }
  ol {
    list-style-type: none;
    line-height: 50px;
    padding-left: 0px;
    margin:0;
    text-align: left;
  }





  .detailBtn {
    margin-left: auto;
    color: #de4343;
  }
  .removeBtn {
    margin-left: 10px;
    color: #de4343;
  }
  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }
  .categorydetailBtn{
    margin-top: 0;
    float: right;
    margin-right: 30px;
  }
  .closeEditModalBtn{
    margin-top:0;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-todoItem{
    outline: none;
    border-style: none;
    transition: opacity 1s;
  /* font-size: 0.9rem; */
  }
  .dday {
    font-size: 0.4rem;
    color:cadetblue;  
  }
  .catebox {
    font-size: 1rem;
    font-weight: 800;
    color: #6667ab;
  }
</style>
