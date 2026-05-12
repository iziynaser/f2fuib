<template>

  <div>

    <transaction-search-form
        @search="search"
    />

    <transaction-table
        :items="transactions"
        @select="openDetail"
    />

    <transaction-detail ref="detail"/>

  </div>

</template>


<script>

import TransactionSearchForm from "./TransactionSearchForm.vue"
import TransactionTable from "./TransactionTable.vue"
import TransactionDetail from "./TransactionDetail.vue"

import {searchTransactions} from "./transactionService"

export default{

  components:{
    TransactionSearchForm,
    TransactionTable,
    TransactionDetail
  },

  data(){

    return{

      transactions:[]

    }

  },

  methods:{

    async search(filter){

      const res=await searchTransactions(filter)

      this.transactions=res.data.content

    },

    openDetail(row){

      this.$refs.detail.open(row.id)

    }

  }

}

</script>
