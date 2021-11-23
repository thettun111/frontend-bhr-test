import gql from 'graphql-tag'

// Fetch All Employee
export const GET_EMPLOYEES_QUERY = gql`
  query getEmployees {
    employees {
      id
      name
      address
      phone_number
    }
  }`

// Fetch Single Employee
export const EMPLOYEE_QUERY = gql`query EmployeeQuery($id: Int!) {
  employee(id: $id) {
      id
      name
      address
      phone_number
  }
}`

// Add new employee
export const ADD_EMPLOYEE_MUTATION = gql`mutation AddEmployeeMutation($name: String!, $address: String!, $phone_number: String!) {
  createEmployee(
      name: $name,
      address: $address,
      phone_number: $phone_number
  ) {
      id
      name
      address
      phone_number
  }
}`

// Update Employee
export const UPDATE_EMPLOYEE_MUTATION = gql`mutation UpdateEmployeeMutation($id: Int!, $name: String!, $address: String!, $phone_number: String!) {
  updateEmployee(
      id: $id,
      name: $name,
      address: $address,
      phone_number: $phone_number
  ) {
      id
      name
      address
      phone_number
  }
}`

// Delte Employee
export const DELETE_EMPLOYEE_MUTATION = gql`mutation DeleteEmployeeMutation($id: Int!) {
  deleteEmployee(id: $id)
}`
