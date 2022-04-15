<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true" @click="updateState(index)"></i>
        <input :class="{textCompleted:propsDone[index]}" style="outline: none;border-style: none;" :placeholder="todoItem" v-model="editedTodoItem[index]" @keyup.enter="editTodo(index)">
        <span class="detailBtn" type="button" @click="showDetailModal(index)">
          <i class="fas fa-ellipsis-v"></i>
        </span>

        <modal v-if="DetailModal" @close="DetailModal = false" >
          <h2 slot="header"> {{propsdata[DetailIndex]}} </h2>
          <div slot="content">
            <br>마감기한
            <input type="text" v-model="deadline">
            <br>장소
            <input type="text" v-model="place">
          </div>
          <span slot="footer" @click="addDetailTodo(DetailIndex,deadline,place)">
            <i class="addDetailBtn fas fa-plus" aria-hidden="true"></i>
          </span>
          <span slot="footer" @click="DetailModal = false">
            <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
          </span>
        </modal>

        <span class="removeBtn" type="button" @click="removeTodo(index)">
          <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
import Modal from './common/DetailModal.vue'


export default {
  data(){
    return{
      DetailModal: false,
      DetailTodo: '',
      place:'',
      deadline:'',
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

    showDetailModal(index){
     
      this.DetailModal=!this.DetailModal
      this.DetailIndex=index
      this.place=JSON.parse(localStorage.getItem(this.propsIdx[index])).place;
      this.deadline=JSON.parse(localStorage.getItem(this.propsIdx[index])).deadline;
    },
    addDetailTodo(DetailIndex,deadline,place){
      this.DetailModal=false
  
      var keyIdx=this.propsIdx[DetailIndex]
      var items=JSON.parse(localStorage.getItem(keyIdx))
      items.deadline=deadline
      items.place=place
      localStorage.setItem(keyIdx,JSON.stringify(items))
      this.clearInput()
    },
    clearInput(){
      this.place='';
      this.deadline='';
    },
    editTodo(index){
      if (this.editedTodoItem[index] !== undefined) {
        var value = this.editedTodoItem[index] && this.editedTodoItem[index].trim();
        var keyIdx=this.propsIdx[index]
				this.$emit('editTodo',keyIdx,index,value)
        this.editedTodoItem= [];
      } else {
        // this.DetailModal=!this.DetailModal 공백 입력시 modal창을 등장시켜라!;
      }

  }}
  ,
  components: {
    Modal: Modal

  }
  

}
</script>

<style scoped>
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
