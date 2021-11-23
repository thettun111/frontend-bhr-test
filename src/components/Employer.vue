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
            <router-link :to="`/employee-detail/${employer.id}`" class="btn btn-outline-success btn-sm" tag="button">view</router-link>
            <router-link :to="`/employee-edit/${employer.id}`" class="btn btn-outline-primary btn-sm ml-2" tag="button">edit</router-link>
            <button @click="deleteEmployee(employer.id)" class="btn btn-outline-danger btn-sm ml-2" >delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--====================== Modal ===========================-->
    <modal name="addEmployee" :clickToClose=false :height="350">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
          <button type="button" class="close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="name">
              </div>
            </div>

            <div class="form-group row">
              <label for="address" class="col-sm-2 col-form-label">Address</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="address" placeholder="Address" v-model="address">
              </div>
            </div>

            <div class="form-group row">
              <label for="phone" class="col-sm-2 col-form-label">Phone</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="phone" placeholder="09-#######" v-model="phone_number">
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="add">Save changes</button>
        </div>
      </div>
    </modal>
  </div>

</template>

<script>
import { GET_EMPLOYEES_QUERY, ADD_EMPLOYEE_MUTATION, DELETE_EMPLOYEE_MUTATION } from '@/graphql'
export default {
  name: 'Home',
  data () {
    return {
      employee: '',
      id: '',
      employees: [],
      name: '',
      address: '',
      phone_number: ''
    }
  },
  apollo: {
    employees: {
      query: GET_EMPLOYEES_QUERY
    }
  },
  methods: {
    close () {
      this.$modal.hide('addEmployee')
      this.$apollo.queries.employees.refresh()
    },
    show () {
      this.$modal.show('addEmployee')
    },
    add () {
      this.$apollo
        .mutate({
          mutation: ADD_EMPLOYEE_MUTATION,
          variables: {
            name: this.name,
            address: this.address,
            phone_number: this.phone_number
          },
          update: (store, { data: { createEmployee } }) => {
            // read data from cache for this query
            const data = store.readQuery({ query: GET_EMPLOYEES_QUERY })

            // add new post from the mutation to existing posts
            data.employees.push(createEmployee)

            // // write data back to the cache
            store.writeQuery({ query: GET_EMPLOYEES_QUERY, data })
          }
        })
        .then(response => {
          // redirect to all postsh
          this.close()
          this.name = ''
          this.address = ''
          this.phone_number = ''
        }).catch((error) => {
          // Error
          console.error(error)
        })
    },
    deleteEmployee (id) {
      var empid = parseInt(id)
      this.$apollo
        .mutate({
          mutation: DELETE_EMPLOYEE_MUTATION,
          variables: {
            id: empid
          },
          update: (store, { data: { employees } }) => {
            // read data from cache for this query
            const cacheData = store.readQuery({ query: GET_EMPLOYEES_QUERY })

            // Find and dlete
            const deletedemp = cacheData.employees.find((employee) => { return employee.id === empid })
            const index = cacheData.employees.indexOf(deletedemp)
            cacheData.employees.splice(index, 1)

            // write data back to the cache
            store.writeQuery({ query: GET_EMPLOYEES_QUERY, cacheData })
          }
        })
        .then(response => {
          this.$apollo.queries.employees.refresh()
        }).catch((error) => {
          // Error
          console.error(error)
        })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
