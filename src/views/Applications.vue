<template>
  <div id="applications">
    <h1 style="padding:1em;">Applications</h1>
    <application-table style="margin:30px;"
      v-on:create="showModal"
      v-on:remove="showRemoveModal"
      v-on:update="updateApplications"></application-table>
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

    <b-modal ref="createApplicationModal" hide-footer title="New Application">
      <application-form
        v-on:cancel="hideModal"
        v-on:created="sendApplication">
      </application-form>  
    </b-modal>
    <b-modal centered
      ref="removeApplicationModal" title="Are you sure?"
      ok-variant="danger"
      ok-title="Remove"
      v-on:ok="deleteApplication">
      <p>You are about to remove your application for {{ openingName }}.</p>
      <p>Do you want to proceed?</p>
    </b-modal>
  </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ApplicationTable from '@/components/ApplicationTable';
import ApplicationForm from '@/components/ApplicationForm';

export default {
  components: {
    ApplicationTable,
    ApplicationForm
  },
  computed: {
    ...mapState([
      'user',
    ]),
    ...mapGetters([
      'applicationCount',
    ]),
  },
  data() {
    return {
      showSuccess: false,
      successMessage: '',
      showError: false,
      errorMessage: '',
      openingName: '',
      applicationId: '',
    }
  },
  methods: {
    ...mapActions([
      'fetchApplications',
      'submitApplication',
      'removeApplication',
    ]),
    showModal () {
      this.$refs.createApplicationModal.show()
    },
    hideModal () {
      this.$refs.createApplicationModal.hide()
    },
    showErrorMessage (error) {
      this.errorMessage = error;
      this.showError = true;
    },
    sendApplication (form) {
      const application = {
        ...form,
        dateSent: new Date(),
        status: 'SENT',
        owner: this.user.id
      }
      this.submitApplication(application)
        .then(newApplication => {
          this.hideModal();
          this.successMessage = 'Application created successfully'
          this.showSuccess = true;
        })
        .catch(err => this.showErrorMessage(err));
    },
    showRemoveModal (application) {
      this.openingName = application.name;
      this.applicationId = application.id;
      this.$refs.removeApplicationModal.show()
    },
    deleteApplication () {
      this.removeApplication(this.applicationId)
        .then(newApplication => {
          this.successMessage = 'Application removed successfully'
          this.showSuccess = true
          this.openingName = ''
          this.applicationId = ''
        })
    },
    updateApplications () {
      this.fetchApplications()
        .then(() => {
          this.successMessage = 'Applications updated'
          this.showSuccess = true
        })
    },
  },
  mounted () {
    this.initData()
  },
  name: 'home'
}
</script>
