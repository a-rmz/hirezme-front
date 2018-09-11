<template>
  <div id="applications">
    <h1 style="padding:1em;">Applications</h1>
    <application-table style="margin:30px;"></application-table>
  </div>
</template>


<script>
import ApplicationTable from '@/components/ApplicationTable';

export default {
  components: {
    ApplicationTable
  },
  name: 'home'
}
</script>
