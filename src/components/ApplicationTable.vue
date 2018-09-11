<template>
  <div>
    <b-table striped responsive :fields="fields" :items="items">
      <template slot="name" slot-scope="row">
        <b-button :variant="'link'" :href="row.item.url">
          {{ row.item.name }}
        </b-button>
      </template>  
      <template slot="company" slot-scope="row">
        <b-button :variant="'link'" :href="row.item.url">
          {{ row.item.company.name }}
        </b-button>
      </template>  
      <template slot="location" slot-scope="row">{{ Object.values(row.item.company.location).join(', ') }}</template>  
      <template slot="actions" slot-scope="row">
        <b-button-group>
          <b-button :variant="'outline-secondary'">
            <fa-icon icon="edit"/>
          </b-button>
          <b-button :variant="'outline-danger'">
            <fa-icon icon="trash-alt"/>
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      fields: [
        { key: 'name', label: 'Opening name', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'location', label: 'Location', sortable: true },
        { key: 'actions' }
      ],
    }
  },
  computed: {
    ...mapState([ 'applications' ]),
    items () {
      return this.applications.map(application => ({
        name: application.name,
        url: application.url,
        status: (application.status === 'SENT') ?
          'Sent' : (application.status === 'REJECTED') ?
            'Rejected' : 'In progress',
        company: application.company,
        _rowVariant: (application.status === 'REJECTED') ? 'danger' : ''
      }))
    },
  },
  methods: {
    ...mapActions([ 'fetchApplications' ])
  },
  mounted() {
    this.fetchApplications()
  }
}
</script>