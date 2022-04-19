<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="오늘의 새싹을 피워주세요♬" v-on:keyup.enter="selectCategory" style="text-align: center;">
    <span class="addContainer" v-on:click="selectCategory">
      <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>

    <AlertModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고</h3>
      <p slot="content">할 일을 입력하세요.</p>
      <span slot="footer" class="closeModalBtn" @click="showModal = false">닫기</span>
    </AlertModal>

    <SelectCategoryModal v-if="TFSelectModal" @close="TFSelectModal=false">
      <div slot="header" >
        <h3 > 카테고리를 선택하세요
        <span class="setupCategoryBtn fas fa-plus" @click="showSetupCategoryModal"></span>
        </h3>
      </div>
      <div slot="content" style="float:left">
        <select class="categorybox" v-model="category">
          <option disabled value="" >카테고리를 선택하세요.</option>
          <option :key=index :value=value  v-for="(value,index) in propsCate">{{propsCate[index]}}</option>
        </select>
      </div>
      <span slot="footer" class="saveCatecoryBtn" @click="addCategory"> 저장하기 </span>
    </SelectCategoryModal>

    <SetupCategoryModal v-if="TFSetupModal" @close="TFSetupModal=false">
      <div slot="content">
        <input type="text" v-model="newCategory" placeholder="추가할 카테고리 이름" @keyup.enter="addNewCategory" style="border-style:solid;height:30px">
      </div>
      <div slot="footer">
        <span class="saveNewCategoryBtn" @click="addNewCategory">저장하기</span>
        <span class="closeNewCategoryBtn" @click="closeNewCategory">닫기</span>
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
  props: ['propsCate'],
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
      var todoItem={todo : value, done : false, deadline:'', place: '',memo:'',category: category}
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
