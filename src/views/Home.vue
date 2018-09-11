<template>
  <div class="home">
    <h1>Home</h1>
    <application-table></application-table>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import ApplicationTable from '@/components/ApplicationTable';

export default {
  components: {
    ApplicationTable
  },
  name: 'home'
}
</script>
