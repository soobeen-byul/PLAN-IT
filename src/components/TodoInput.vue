<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="오늘의 새싹을 피워주세요♬" v-on:keyup.enter="selectCategory">
    <span class="addContainer" v-on:click="selectCategory">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>

    <AlertModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <span slot="footer" @click="showModal = false">할 일을 입력하세요.
        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
      </span>
    </AlertModal>

    <SelectCategoryModal v-if="TFSelectModal" @close="TFSelectModal=false">
      <h3 slot="header"> 카테고리를 선택하세요
        <span class="setupCategoryBtn fas fa-plus" @click="showSetupCategoryModal"></span>
      </h3>
      <div slot="content">
        <input type="text" v-model="category" placeholder="카테고리를 선택하세요">
      </div>
      <span slot="footer" class="saveCatecoryBtn" @click="addCategory"> SAVE </span>
    </SelectCategoryModal>

    <SetupCategoryModal v-if="TFSetupModal" @close="TFSetupModal=false">
      <div slot="content">
        <input type="text" v-model="newCategory" placeholder="추가할 카테고리 이름" @keyup.enter="addNewCategory">
      </div>
      <div slot="footer">
        <span class="saveNewCategoryBtn" @click="addNewCategory">SAVE</span>
        <span class="closeNewCategoryBtn" @click="closeNewCategory">CLOSE</span>
      </div>
    </SetupCategoryModal>

  </div>
</template>

<script>
import AlertModal from './common/AlertModal.vue'
import SelectCategoryModal from './common/SelectCategoryModal.vue'
import SetupCategoryModal from './common/SetupCategoryModal.vue'

export default {
  data() {
    return {
      newTodoItem: '',
      category: '',
      newCategory: '',
      showModal: false,
      TFSelectModal: false,
      TFSetupModal: false
    }
  },
  methods: {
    selectCategory(){
      if (this.newTodoItem !== ""){
        this.TFSelectModal =! this.TFSelectModal;
      }
      else{
this.showModal = !this.showModal;
      }
    },
    addCategory(){
      var category = this.category;
      var value = this.newTodoItem && this.newTodoItem.trim();
      var todoItem={todo : value, done : false, deadline:'', place: '',memo:'',category: category,dday:''}
      var keyIdx=Date.now()

      this.$emit('addCategory',keyIdx ,todoItem);
      this.TFSelectModal =! this.TFSelectModal;
      this.category='';
      this.newTodoItem='';
    },
    showSetupCategoryModal(){
      this.TFSelectModal=!this.TFSelectModal;
      this.TFSetupModal=!this.TFSetupModal;
    },
    addNewCategory(){
      var newCategory=this.newCategory;

      this.$emit('addNewCategory',newCategory);
      this.TFSetupModal =! this.TFSetupModal;
      this.TFSelectModal =! this.TFSelectModal;
      this.newCategory=''
    },
    closeNewCategory(){
      this.TFSetupModal =! this.TFSetupModal;
      this.TFSelectModal =! this.TFSelectModal;
      this.newCategory=''
    }
  },
  components: {
    AlertModal: AlertModal,
    SelectCategoryModal: SelectCategoryModal,
    SetupCategoryModal: SetupCategoryModal
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, rgba(133, 134, 193, 0.8), rgba(102,103,171));
  display: inline-block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}

</style>
