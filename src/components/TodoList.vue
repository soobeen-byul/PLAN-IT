<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
        <span type="button" aria-hidden="true" @click="updateState(index)"><img v-if=propsDone[index] src="..\src\assets\flower.png" width="25" height="25" align='center'><img v-else src="..\src\assets\seed.png" width="25" height="25" align='center'></span>
        <input :class="{textCompleted:propsDone[index]}" style="outline: none;border-style: none;" :placeholder="todoItem" v-model="editedTodoItem[index]" @keyup.enter="editTodo(index)">
        <span class="detailBtn" type="button" @click="showDetailModal(index)">
          <i class="fas fa-ellipsis-v"></i>
        </span>

        <EditAlertModal v-if="showEditAlertModal" @close="showEditAlertModal = false">
          <h3 slot="header">경고</h3>
         <span slot="footer" @click="showEditAlertModal = false">할 일을 입력하세요.
            <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
         </span>
        </EditAlertModal> 

        <DetailModal v-if="TFDetailModal" @close="TFDetailModal = false">
          <h2 slot="header"> {{propsdata[DetailIndex]}} </h2>
          <div slot="content">
            <br>카테고리
              <input type="text" v-model="category" placeholder="카테고리를 선택하세요">
            <br>마감기한
              <input type="text" v-model="deadline">
            <br>장소
              <input type="text" v-model="place">
            <br>메모
              <input type="text" v-model="memo">
          </div>
          <span slot="footer" @click="addDetailTodo(DetailIndex,deadline,place,memo,category)">
            <span class="saveDetailBtn" >SAVE</span>
          </span>
          <span slot="footer" @click="TFDetailModal = false">
            <span class="closeDetailBtn" >CLOSE</span>
          </span>
        </DetailModal>

        <span class="removeBtn" type="button" @click="removeTodo(index)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
import DetailModal from './common/DetailModal.vue'
import EditAlertModal from './common/EditAlertModal.vue'


export default {
  data(){
    return{
      TFDetailModal: false,
      showEditAlertModal: false,
      DetailTodo: '',
      place:'',
      deadline:'',
      memo:'',
      category:'',
      done:'',
      //카테고리 라디오버튼 할때 빼기
      editedTodoItem: [],
      doneItems: []
    }
  }
  ,
  props: ['propsdata','propsIdx','propsDone'],

  methods: {
    removeTodo(index) {
      var keyIdx=this.propsIdx[index]
      this.$emit('removeTodo',keyIdx,index);
    },
    updateState(index){
      var keyIdx=this.propsIdx[index]
      this.$emit('updateState',keyIdx,index);
    },
    // updateState(todoItem){
    //   var items=JSON.parse(localStorage.getItem(todoItem))
    //   items.done=!items.done
    //   localStorage.setItem(todoItem,JSON.stringify(items))
    //   console.log(todoItem.done)
    // } ,
    
    showDetailModal(index){
      // this.$emit('showDetailModal',index)
      this.TFDetailModal=!this.TFDetailModal
      this.DetailIndex=index
      
      var items =JSON.parse(localStorage.getItem(this.propsIdx[index]))
      this.done=items.done
      this.place=items.place
      this.deadline=items.deadline
      this.memo=items.memo
      this.category=items.category 
    },
    addDetailTodo(DetailIndex){
      this.TFDetailModal=false
      var keyIdx=this.propsIdx[DetailIndex]
   
      var items={todo :this.propsdata[DetailIndex], done : this.done , deadline: this.deadline, place: this.place, memo: this.memo, category: this.category}
      localStorage.setItem(keyIdx,JSON.stringify(items))
      this.clearInput()
    },
    clearInput(){
      this.place='';
      this.deadline='';
      this.done=''
      this.memo=''
      this.category=''
    },
    editTodo(index){
      if (this.editedTodoItem[index] !== undefined) {
        var value = this.editedTodoItem[index] && this.editedTodoItem[index].trim();
        var keyIdx=this.propsIdx[index]
				this.$emit('editTodo',keyIdx,index,value)
        this.editedTodoItem= [];
      } else {
        this.showEditAlertModal=!this.showEditAlertModal
      }

  }}
  ,
  components: {
    DetailModal: DetailModal,
    EditAlertModal: EditAlertModal

  }
  

}
</script>

<style>
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
  }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
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



  .list-enter-active, .list-leave-active {
    /* transition: all 1s; */
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
</style>
