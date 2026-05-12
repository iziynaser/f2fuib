<template>

  <div>

    <b-input-group>

      <b-form-input
          readonly
          :value="displayValue"
          placeholder="انتخاب حساب"
          @click="open"
      />

      <b-input-group-append>

        <b-button
            variant="outline-secondary"
            @click="open"
        >
          انتخاب
        </b-button>

        <b-button
            v-if="value"
            variant="outline-danger"
            @click="clearSelection"
        >
          پاک
        </b-button>

      </b-input-group-append>

    </b-input-group>

    <b-modal
        ref="modal"
        title="انتخاب حساب"
        size="lg"
    >

      <b-form-input
          v-model="search"
          placeholder="جستجوی حساب..."
          class="mb-2"
      />

      <div class="tree-box">

        <account-tree-node
            v-for="acc in filteredTree"
            :key="acc.id"
            :account="acc"
            :selected-id="currentSelected ? currentSelected.id : null"
            @select="selectNode"
            @confirm="confirmNode"
        />

      </div>

      <template #modal-footer>

        <b-button
            variant="secondary"
            @click="close"
        >
          بستن
        </b-button>

        <b-button
            variant="primary"
            :disabled="!canConfirm"
            @click="confirmSelection"
        >
          تأیید
        </b-button>

      </template>

    </b-modal>

  </div>

</template>

<script>

import {getAccountTree} from "../api/chartOfAccount"
import AccountTreeNode from "./AccountTreeNode.vue"

export default {

  name:"AccountTreePicker",

  components:{
    AccountTreeNode
  },

  props:{
    value:[Number,String]
  },

  data(){

    return{

      tree:[],
      search:"",
      loaded:false,

      selectedAccount:null,
      currentSelected:null

    }

  },

  computed:{

    displayValue(){

      if(!this.selectedAccount) return ""

      return this.selectedAccount.code+" - "+this.selectedAccount.name

    },

    canConfirm(){
      return this.currentSelected && this.currentSelected.postable === true
    },

    filteredTree(){

      if(!this.search) return this.tree

      const term=this.search.toLowerCase()

      function filter(nodes){

        return nodes.map(n=>{

          const children=n.children?filter(n.children):[]

          if(
              (n.code && n.code.toLowerCase().includes(term)) ||
              (n.name && n.name.toLowerCase().includes(term)) ||
              children.length
          ){
            return {...n,children}
          }

          return null

        }).filter(Boolean)

      }

      return filter(this.tree)

    }

  },

  methods:{

    async open(){

      if(!this.loaded){

        const res=await getAccountTree()

        this.tree=res.data
        this.loaded=true

      }

      this.currentSelected=this.selectedAccount

      this.$refs.modal.show()

    },

    close(){
      this.$refs.modal.hide()
    },

    selectNode(account){
      this.currentSelected=account
    },

    confirmNode(account){

      if(!account.postable) return

      this.currentSelected=account
      this.confirmSelection()

    },

    confirmSelection(){

      if(!this.currentSelected || !this.currentSelected.postable)
        return

      this.selectedAccount=this.currentSelected

      this.$emit("input",this.selectedAccount.id)
      this.$emit("change",this.selectedAccount)

      this.close()

    },

    clearSelection(){

      this.selectedAccount=null
      this.currentSelected=null

      this.$emit("input",null)

    }

  }

}

</script>

<style scoped>

.tree-box{
  max-height:400px;
  overflow:auto;
  border:1px solid #ddd;
  padding:10px;
  border-radius:4px;
}

</style>
