<template>

  <div class="container-fluid rtl">

    <b-row>

      <b-col cols="5">

        <h5 class="mb-3">چارت حساب ها</h5>

        <account-tree
            :nodes="tree"
            :selected-id="selected ? selected.id : null"
            @select="selectAccount"
        />

      </b-col>


      <b-col cols="3">

        <b-card>

          <h6 class="mb-3">عملیات</h6>

          <b-button
              block
              variant="success"
              class="mb-2"
              :disabled="!selected"
              @click="createChild"
          >
            افزودن زیر حساب
          </b-button>


          <b-button
              block
              variant="primary"
              class="mb-2"
              :disabled="!selected"
              @click="editAccount"
          >
            ویرایش
          </b-button>


          <b-button
              block
              variant="danger"
              :disabled="!selected"
              @click="deleteAccountAction"
          >
            حذف
          </b-button>

        </b-card>

      </b-col>


      <b-col>

        <b-card v-if="selected">

          <h5>{{selected.name}}</h5>

          <p>کد حساب : {{selected.code}}</p>

          <p>سطح : {{selected.accountLevel}}</p>

        </b-card>

      </b-col>

    </b-row>


    <account-form-modal
        ref="formModal"
        @saved="loadTree"
    />

  </div>

</template>



<script>

import AccountTree from "./AccountTree.vue"
import AccountFormModal from "./AccountFormModal.vue"

import {getAccountTree,deleteAccount} from "../api/chartOfAccount"

export default{

  name:"ChartOfAccounts",

  components:{
    AccountTree,
    AccountFormModal
  },

  data(){
    return{
      tree:[],
      selected:null
    }
  },

  mounted(){
    this.loadTree()
  },

  methods:{

    async loadTree(){

      const res=await getAccountTree()

      this.tree=res.data

    },

    selectAccount(node){

      this.selected=node

    },

    createChild(){

      this.$refs.formModal.openCreate(this.selected)

    },

    editAccount(){

      this.$refs.formModal.openEdit(this.selected)

    },

    async deleteAccountAction(){

      if(!confirm("حذف حساب انجام شود؟")) return

      await deleteAccount(this.selected.id)

      this.selected=null

      this.loadTree()

    }

  }

}

</script>


<style>

.rtl{
  direction:rtl;
  text-align:right;
}

</style>
