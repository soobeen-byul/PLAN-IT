<template>
  <div class="clearAllContainer" >
    <span class="clearAllBtn" @click="showClearModal">Clear All</span>
    <div class="doneleft">
      할일 {{doneLeft}}개 남음!
    </div>
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
  props: ['propsDone'],

  methods: {
    showClearModal(){
      this.showClearAlertModal=!this.showClearAlertModal;
    },
    clearTodo() {
      this.$emit('removeAll');
      this.showClearAlertModal=!this.showClearAlertModal;
    },
  },
  
  computed: {
    doneLeft: function() {
      var undone = this.propsDone
      undone = undone.filter(item => item === false);
      return undone.length
    }
  },


  components: {
    ClearAlertModal:ClearAlertModal

  }
}
</script>

<style scoped>
  .clearAllContainer {
    position: fixed;
    bottom:0;
    width:100%;

    height: 150px;
    line-height: 50px;
    border-radius: 5px;
    margin-top: 0;
    float:none;
    
  }
  .pageContainer{
    height: 40px;
    line-height:40px;
    margin-top:20px;
    width:auto;
    
  }

  .clearAllBtn {
    width: 8.5rem;
    color: #e20303;
    float:none;
  }
  .allBtn{
    color: rgb(102, 103, 171);
    /* width: 100px; */
    float:left;
  }
  .unfinishedBtn{
    color: rgb(102, 103, 171);
    /* width: 100px; */
    float:auto;
  }
  .finishedBtn{
    color: rgb(102, 103, 171);
    width: 90px;
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
  .doneleft{
    height: 30px;
    line-height: 30px;
    bottom:0;
    margin-bottom:0;
    margin-top:0;
    padding-bottom:0;
  }
</style>
