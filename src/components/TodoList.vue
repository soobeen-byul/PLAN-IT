<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
        <i class="checkBtn fas fa-check" aria-hidden="true" @click="updateState(todoItem)"></i>
        {{ todoItem }}
        <span class="detailBtn" type="button" @click="showDetailModal(todoItem,index)">
          <i class="fas fa-ellipsis-v"></i>
        </span>

        <modal v-if="DetailModal" @close="DetailModal = false" >
          <h2 slot="header"> {{DetailTodo}} </h2>
          <div slot="content">
            <br>마감기한
            <input type="text" v-model="deadline" placeholder="마감기한을 입력하세요">
            <br>장소
            <input type="text" v-model="place" placeholder="장소를 입력하세요">
          </div>
          <span slot="footer" @click="addDetailTodo(DetailTodo,deadline,place)">
            <i class="addDetailBtn fas fa-plus" aria-hidden="true"></i>
          </span>
          <span slot="footer" @click="DetailModal = false">
            <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
          </span>
        </modal>

        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
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
      deadline:''
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
      items[0].done=!items[0].done
      localStorage.setItem(todoItem,JSON.stringify(items))
    } ,
    
    showDetailModal(todoItem, index){
      this.$emit('showDetailModal',todoItem,index)
      this.DetailModal=!this.DetailModal
      this.DetailTodo=todoItem
    },
    addDetailTodo(DetailTodo,deadline,place){
      this.DetailModal=false
      this.todoItem=DetailTodo
      var items={done : false , deadline: deadline, place: place}
      localStorage.setItem(DetailTodo,JSON.stringify(items))
      this.clearInput()

      
    },
    clearInput(){
      this.place='';
      this.deadline='';
    }

  }
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

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
