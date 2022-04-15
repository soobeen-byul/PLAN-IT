<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true" @click="updateState(todoItem)"></i>
        <input class="list-todoItem" :placeholder="todoItem" v-model="editedTodoItem[index]" @keyup.enter="editTodo(todoItem,index)">
        <span class="detailBtn" type="button" @click="showDetailModal(todoItem,index)">
          <i class="fas fa-ellipsis-v"></i>
        </span>

        <EditAlertModal v-if="showEditAlertModal" @close="showEditAlertModal = false">
          <h3 slot="header">경고</h3>
         <span slot="footer" @click="showEditAlertModal = false">할 일을 입력하세요.
            <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
         </span>
        </EditAlertModal> 

        <DetailModal v-if="TFDetailModal" @close="TFDetailModal = false">
          <h2 slot="header"> {{DetailTodo}} </h2>
          <div slot="content">
            <br>카테고리
              <input type="text" v-model="category" placeholder="카테고리를 선택하세요">
            <br>마감기한
              <input type="text" v-model="deadline" placeholder="마감기한을 입력하세요">
            <br>장소
              <input type="text" v-model="place" placeholder="장소를 입력하세요">
            <br>메모
              <input type="text" v-model="memo" placeholder="추가정보를 입력하세요">
          </div>
          <span slot="footer" @click="addDetailTodo(DetailTodo,deadline,place,memo,category)">
            <span class="saveDetailBtn" >SAVE</span>
          </span>
          <span slot="footer" @click="TFDetailModal = false">
            <span class="closeDetailBtn" >CLOSE</span>
          </span>
        </DetailModal>

        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
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
      //카테고리 라디오버튼 할때 빼기
      editedTodoItem: []
    }
  }
  ,

  props: ['propsdata'],

  methods: {
    removeTodo(todoItem, index) {
      this.$emit('removeTodo', todoItem, index);
    },
    updateState(todoItem){
      var items=JSON.parse(localStorage.getItem(todoItem))
      items.done=!items.done
      localStorage.setItem(todoItem,JSON.stringify(items))
      console.log(todoItem.done)
    } ,
    
    showDetailModal(todoItem, index){
      this.$emit('showDetailModal',todoItem,index)
      this.TFDetailModal=!this.TFDetailModal
      this.DetailTodo=todoItem
    },
    addDetailTodo(DetailTodo,deadline,place,memo,category){
      this.TFDetailModal=false
      this.todoItem=DetailTodo
      var items={done : false , deadline: deadline, place: place, memo: memo, category: category}
      localStorage.setItem(DetailTodo,JSON.stringify(items))
 
    },

    editTodo(todoItem,index){
      if (this.editedTodoItem[index] !== undefined) {
        console.log(this.editedTodoItem[index])
        var value = this.editedTodoItem[index] && this.editedTodoItem[index].trim();
				this.$emit('editTodo',index,todoItem,value)
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



  .list-enter-active, .list-leave-active {
    transition: all 1s;
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
