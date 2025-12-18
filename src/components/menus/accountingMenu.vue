<template>
    <div>
        <b-nav-item-dropdown :text="$t('ACCOUNTING_SITE')" right>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(6,$t('ACCOUNTING_invoices'))">{{ $t('ACCOUNTING_invoices') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item>
                  <b-button  size="sm" variant="link" @click="createAcTabs(1,'createPayment')">createPayment</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(2,$t('ACCOUNTING_paymentGroups'))">{{ $t('ACCOUNTING_paymentGroups') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(3,$t('ACCOUNTING_transaction'))">{{ $t('ACCOUNTING_transaction') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(4,$t('ACCOUNTING_billingAccount'))">{{ $t('ACCOUNTING_billingAccount') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(5,$t('ACCOUNTING_financialAccount'))">{{ $t('ACCOUNTING_financialAccount') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(6,$t('ACCOUNTING_aggreement'))">{{ $t('ACCOUNTING_aggreement') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(7,$t('ACCOUNTING_fixedAssets'))">{{ $t('ACCOUNTING_fixedAssets') }}</b-button>
            </b-dropdown-item>

            <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(8,$t('ACCOUNTING_budget'))">{{ $t('ACCOUNTING_budget') }}</b-button>
            </b-dropdown-item>

            <!-- <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(6,$t('invoices'))">{{ $t('invoices') }}</b-button>
            </b-dropdown-item> -->

            
            <!-- <b-dropdown-item href="#">
                  <b-button  size="sm" variant="link" @click="createAcTabs(7,$t('find_invoice'))">{{ $t('find_invoice') }}</b-button>
            </b-dropdown-item> -->

        </b-nav-item-dropdown>

    </div>
</template>

<script>
import budget from '../backEnd/acc/budget.vue'
import fixedAssets from '../backEnd/acc/fixedAssets.vue'
import aggreement from '../backEnd/acc/aggreement.vue'
import billingAccount from '../backEnd/acc/billingAccount.vue'
import createPayment from '../backEnd/payment/createPayment.vue'
import FinAccountMain from '../backEnd/acc/fin/FinAccountMain'
import invoice from '../backEnd/invoice/invoice'
import findInvoice from '../backEnd/invoice/findInvoice.vue'
export default {
    name: 'accountingMenu',
    props: {
    },
    data() {
        return {
      cp: [
                budget,
                fixedAssets,
                aggreement,
                billingAccount ,
                createPayment,
                FinAccountMain,
                invoice,
                findInvoice
           ]
        }
    },
  methods: {
    createAcTabs(idParam, nameParam) {
      let atab = {
        id: idParam ,
        name: nameParam,
        contnt : this.cp[idParam]
      }
      atab.id = (atab.id + 20);
      //console.log(atab);
      this.$emit('createAppTab',atab);
    }
  },
    components: {
        // createPayment
    }
}
</script>

<style scoped></style>