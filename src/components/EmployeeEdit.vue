<template>
    <div class="container">
        <form>
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="employee.name">
                </div>
            </div>

            <div class="form-group row">
                <label for="address" class="col-sm-2 col-form-label">Address</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="address" placeholder="Address" v-model="employee.address">
                </div>
            </div>

            <div class="form-group row">
                <label for="phone" class="col-sm-2 col-form-label">Phone</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="phone" placeholder="09-#######" v-model="employee.phone_number">
                </div>
            </div>
            <button type="button" class="btn btn-primary" @click="update">Save changes</button>
        </form>
    </div>
</template>

<script>
import { EMPLOYEE_QUERY, UPDATE_EMPLOYEE_MUTATION } from '@/graphql'
export default {
  name: 'Edit',
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
  },
  methods: {
    update () {
      const name = this.employee.name
      const address = this.employee.address
      const phoneNnumber = this.employee.phone_number
      const id = parseInt(this.employee.id)
      this.$apollo
        .mutate({
          mutation: UPDATE_EMPLOYEE_MUTATION,
          variables: {
            id: id,
            name: name,
            address: address,
            phone_number: phoneNnumber
          }
          // update: (store, { data: { updateEmployee } }) => {
          //   // read data from cache for this query
          //   const data = store.readQuery({ query: GET_EMPLOYEES_QUERY })

          //   // add new post from the mutation to existing posts
          //   data.employees.push(updateEmployee)

          //   // // write data back to the cache
          //   store.writeQuery({ query: GET_EMPLOYEES_QUERY, data })
          // }
        })
        .then(response => {
          this.$router.replace('/')
        })
    }
  }
}
</script>

<style scoped>

</style>
