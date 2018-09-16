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
          <b-button variant="primary" @click="$emit('update')">
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
        <template slot="company" @click.stop="row.toggleDetails" slot-scope="row">
          <b-link @click.stop="row.toggleDetails">
            {{ row.item.company.name }}
          </b-link>
        </template>
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
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Company name:</b></b-col>
              <b-col>{{ row.item.company.name }}</b-col>
            </b-row>
            <b-row v-if="row.item.company.tags.length > 0" class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Tags:</b></b-col>
              <b-col>
                <b-button size="sm" variant="info"
                  style="margin:0 3px 10px 3px;"
                  disabled
                  v-for="(tag, index) in row.item.company.tags" :key="index">
                    {{ tag }}
                </b-button>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Location:</b></b-col>
              <b-col>{{
                (row.item.company.location.address ? `${row.item.company.location.address}, ` : '') +
                (row.item.company.location.city ? `${row.item.company.location.city}, ` : '') +
                (row.item.company.location.country ? `${row.item.company.location.country}` : '')
              }}</b-col>
            </b-row>
            <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Opening name', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'actions', label: '' }
      ],
      rowActionsVisible: 0,
      filter: null
    }
  },
  computed: {
    ...mapState([ 'applications' ]),
    items () {
      return this.applications.map(application => ({
        id: application.id,
        name: application.name,
        url: application.url,
        status: (application.status === 'SENT')
          ? 'Sent' : (application.status === 'REJECTED')
            ? 'Rejected' : 'In progress',
        company: application.company,
        actionsVisible: false,
        _rowVariant: (application.status === 'REJECTED') ? 'danger' : ''
      }))
    }
  },
  methods: {
    hoverRow (item, index, event) {
      this.items[this.rowActionsVisible].actionsVisible = false
      this.rowActionsVisible = index
      item.actionsVisible = true
    }
  }
}
</script>

<style>
.table-header {
  padding: 1em;
}

td {
  height: 1.2em;
}
</style>
