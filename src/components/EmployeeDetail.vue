<template>
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <ul class="list-group">
        <li class="list-group-item active">Employee Detail</li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <p>Name:</p>
          <span>{{employee.name}}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <p>Address:</p>
          <span>{{employee.address}}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <p>Phone Number:</p>
          <span>{{employee.phone_number}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { EMPLOYEE_QUERY } from '@/graphql'
export default {
  name: 'Detail',
  data () {
    return {
      employee: '',
      id: parseInt(this.$route.params.id)
    }
  },
  apollo: {
    employee: {
      query: EMPLOYEE_QUERY,
      variables () {
        return {
          id: this.id
        }
      }
    }
  }
}
</script>
