<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" @click="showClearModal">Clear All</span>
    <div class="pageContainer">
      <span class="allBtn">ALL</span>
      <span class="unfinishedBtn">UNFINISHED</span>
      <span class="finishedBtn">FINISHED</span>
    </div>

    <ClearAlertModal v-if="showClearAlertModal" @close="showClearAlertModal = false">
      <h3 slot="header">경고</h3>
      <span slot="content">정말 삭제하겠습니까?</span>
      <span slot="footer">
        <span class="realCloseBtn"  @click="clearTodo">네</span>
        <span class="noCloseBtn" @click="showClearAlertModal = false">아니요</span>
      </span>
    </ClearAlertModal> 
  </div>



</template>

<script>

import ClearAlertModal from './common/ClearAlertModal.vue'

export default {
  data(){
    return{
      showClearAlertModal:false

    }

  },
  methods: {
    showClearModal(){
      this.showClearAlertModal=!this.showClearAlertModal;
    },
    clearTodo() {
      this.$emit('removeAll');
      this.showClearAlertModal=!this.showClearAlertModal;
    }
  },
  components: {
    ClearAlertModal:ClearAlertModal

  }
}
</script>

<style scoped>
  .clearAllContainer {
    width:624px;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin-right: 0;
    float:right;
  }
  .pageContainer{
    margin-top:20px;
    width:auto;
  }

  .clearAllBtn {
    width: 8.5rem;
    color: #e20303;
    float:none;
  }
  .allBtn{
    border-style: solid;
    color: rgb(102, 103, 171);
    background-color: white;
    width: 100px;
    float:left;
  }
  .unfinishedBtn{
    border-style: solid;
    color: rgb(102, 103, 171);
    background-color: white;
    width: 100px;
    float:auto;
  }
  .finishedBtn{
    border-style: solid;
    color: rgb(102, 103, 171);
    background-color: white;
    width: 100px;
    float:right;
  }


  
  .realCloseBtn{
    width: 7.5rem;
    height: 40px;
    line-height: 40px;
    color: rgb(102, 103, 171);
    background-color:white;
    border-radius: 5px;
    margin-right: 0;
    float:left;
    border-style: solid;
  }
  .noCloseBtn{
    width: 7.5rem;
    height: 40px;
    line-height: 40px;
    color: rgb(102, 103, 171);
    background-color:white;
    border-radius: 5px;
    margin-right: 0;
    float:right;
    border-style: solid;
  }
</style>
