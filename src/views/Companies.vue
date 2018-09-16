<template>
  <div id="companies">
    <h1 style="padding:1em;">Companies</h1>
    <company-table style="margin:30px;"
      v-on:create="showModal"
      v-on:remove="showRemoveModal"
      v-on:update="updateCompanies"></company-table>
    <b-alert variant="success"
        dismissible
        :show="showSuccess"
        @dismissed="showSuccess=false;successMessage=''">
      {{ successMessage }}
    </b-alert>
    <b-alert variant="danger"
      dismissible
      :show="showError"
      @dismissed="showError=false;errorMessage=''">
      {{ errorMessage }}
    </b-alert>

    <b-modal ref="createCompanyModal" hide-footer title="New Company">
      <company-form
        v-on:cancel="hideModal"
        v-on:created="sendCompany">
      </company-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CompanyTable from '@/components/CompanyTable'
import CompanyForm from '@/components/CompanyForm'

export default {
  components: {
    CompanyTable,
    CompanyForm
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  data () {
    return {
      showSuccess: false,
      successMessage: '',
      showError: false,
      errorMessage: '',
      openingName: '',
      companyId: ''
    }
  },
  methods: {
    ...mapActions([
      'initData',
      'fetchCompanies',
      'submitCompany',
      'removeCompany'
    ]),
    showModal () {
      this.$refs.createCompanyModal.show()
    },
    hideModal () {
      this.$refs.createCompanyModal.hide()
    },
    showRemoveModal () {

    },
    sendCompany (form) {
      const company = {
        ...form,
        owner: this.user.id
      }
      this.submitCompany(company)
        .then(newCompany => {
          this.hideModal()
          this.successMessage = 'Company created successfully'
          this.showSuccess = true
        })
        .catch(err => this.showErrorMessage(err))
    },
    updateCompanies () {
      this.fetchCompanies()
        .then(() => {
          this.successMessage = 'Companies updated'
          this.showSuccess = true
        })
    }
  },
  mounted () {
    this.initData()
  }
}
</script>
