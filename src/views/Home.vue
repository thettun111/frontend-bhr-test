<template>
  <div class="container">
    <div class="d-flex justify-content-end mb-2">
      <button class="btn btn-sm btn-success" @click="show">Add New</button>
      </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Phone Number</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employer in employees" :key="employer.id">
          <th scope="row" >{{employer.id}}</th>
          <td>{{employer.name}}</td>
          <td>{{employer.address}}</td>
          <td>{{employer.phone_number}}</td>
          <td>
            <router-link to="/about " class="btn btn-outline-primary btn-sm" tag="button">edit</router-link>
            <router-link to="/about " class="btn btn-outline-danger btn-sm ml-2" tag="button">delete</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <modal name="employer" :clickToClose=false>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
          <button type="button" class="close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>

      </div>
    </modal>
  </div>

</template>

<script>
import gql from 'graphql-tag'

const GET_EMPLOYEES = gql`
  query getEmployees {
    employees {
      id
      name
      address
      phone_number
    }
  }
`

export default {
  apollo: {
    employees: {
      query: GET_EMPLOYEES
    }
  },
  methods: {
    close () {
      this.$modal.hide('employer')
      this.$apollo.queries.employees.refresh()
    },
    show () {
      this.$modal.show('employer')
    }
  }
}
</script>
