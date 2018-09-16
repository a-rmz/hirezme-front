<template>
  <div>
    <b-container>
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
          <template slot="location" slot-scope="row">{{
            (row.item.location.address ? `${row.item.location.address}, ` : '') +
            (row.item.location.city ? `${row.item.location.city}, ` : '') +
            (row.item.location.country ? `${row.item.location.country}` : '')
          }}</template>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      fields: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'location', label: 'Location', sortable: true },
        { key: 'actions', label: '' }
      ],
      rowActionsVisible: 0,
      filter: null
    }
  },
  computed: {
    ...mapState([ 'companies' ]),
    items () {
      return this.companies.map(company => ({
        id: company.id,
        name: company.name,
        url: company.url,
        location: company.location,
        actionsVisible: false
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
