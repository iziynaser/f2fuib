<template>

  <b-modal
      ref="modal"
      title="جزئیات سند حسابداری"
      size="lg"
      hide-footer
  >

    <b-row>

      <b-col>
        <p>شماره سند: {{transaction.documentNumber}}</p>
        <p>تاریخ: {{transaction.transactionDate}}</p>
        <p>شرح: {{transaction.description}}</p>
        <p>وضعیت: {{transaction.status}}</p>
      </b-col>

    </b-row>


    <b-table
        striped
        :items="transaction.lines"
        :fields="fields"
    />

  </b-modal>

</template>


<script>

import {getTransaction} from "./transactionService"

export default{

  data(){

    return{

      transaction:{lines:[]},

      fields:[

        {key:"accountCode",label:"کد حساب"},
        {key:"accountName",label:"نام حساب"},
        {key:"debit",label:"بدهکار"},
        {key:"credit",label:"بستانکار"},
        {key:"description",label:"شرح"}

      ]

    }

  },

  methods:{

    async open(id){

      const res=await getTransaction(id)

      this.transaction=res.data

      this.$refs.modal.show()

    }

  }

}

</script>
