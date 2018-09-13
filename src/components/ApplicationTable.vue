<template>
  <div>
    <b-container fluid>
      <b-row top-row>
        <b-col md="6" class="table-header">
          <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
              <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="table-header">
          <b-button variant="success" style="margin-right:10px;" @click="$emit('create')">Create</b-button>
          <b-button variant="primary">
            <fa-icon icon="sync-alt"/>
          </b-button>
        </b-col> 
      </b-row>
      <b-table striped responsive outlined stacked="md"
        :filter="filter"
        :fields="fields"
        :items="items"
        @row-hovered="hoverRow">
        <template slot="name" slot-scope="row">
          <b-link :href="row.item.url">
            {{ row.item.name }}
          </b-link>
        </template>  
        <template slot="company" slot-scope="row">
          <b-link :href="row.item.url">
            {{ row.item.company.name }}
          </b-link>
        </template>  
        <template slot="location" slot-scope="row">{{ Object.values(row.item.company.location).join(', ') }}</template>  
        <template slot="actions" slot-scope="row" v-if="row.item.actionsVisible">
          <b-button-group size="sm">
            <b-button :variant="'link'" size="sm">
              <fa-icon icon="edit"/>
            </b-button>
            <b-button :variant="'link'" size="sm" @click="$emit('remove', row.item);rowActionsVisible=0;">
              <fa-icon icon="trash-alt" color="red"/>
            </b-button>
          </b-button-group>
        </template>
      </b-table>
    </b-container>
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
        { key: 'location', label: 'Location' },
        { key: 'actions', label: '' }
      ],
      rowActionsVisible: 0,
      filter: null,
    }
  },
  computed: {
    ...mapState([ 'applications' ]),
    items () {
      return this.applications.map(application => ({
        id: application.id,
        name: application.name,
        url: application.url,
        status: (application.status === 'SENT') ?
          'Sent' : (application.status === 'REJECTED') ?
            'Rejected' : 'In progress',
        company: application.company,
        actionsVisible: false,
        _rowVariant: (application.status === 'REJECTED') ? 'danger' : ''
      }))
    },
  },
  methods: {
    ...mapActions([ 'fetchApplications' ]),
    hoverRow (item, index, event) {
      this.items[this.rowActionsVisible].actionsVisible = false;
      this.rowActionsVisible = index;
      item.actionsVisible = true;
    },
  },
  mounted() {
    this.fetchApplications()
  }
}
</script>

<style scoped>
.table-header {
  padding: 1em;
}

td {
  height: 1.2em;
}
</style>
