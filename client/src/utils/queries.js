import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      password
    }
  }
`;

export const QUERY_ADMINS = gql`
  query getSingleRun {
    admins {
      _id
      username
      userType
      email
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query getEmployee($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      runs {
        _id
        approved
        addresses {
          address
        }
      }
    }
  }
`;

export const QUERY_SINGLE_RUN = gql`
  query getSingleRun($runId: ID!) {
    run(runId: $runId) {
      _id
      addresses {
        _id
        address
        bookingId
        latlng {
          lat
          lng
        }
      }
      approved
    }
  }
`;

export const QUERY_ADMIN_EMPLOYEES = gql`
  query getadminemployees($username: String!) {
    adminemployees(username: $username) {
      username
      employees {
        username
        _id
      }
    }
  }
`;

export const EMPLOYEE_RUN = gql`
  query employeeruns($employeeId: ID) {
    employeeruns(employeeId: $employeeId) {
      runs {
        _id
        approved
        addresses {
          address
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_BOOKINGS = gql`
  query findUserBooks($userId: ID!) {
    findUserBooks(userId: $userId) {
      _id
      address
      createdAt
      date
      time
    }
  }
`;

export const QUERY_ALL_BOOKINGS = gql`
  query findUserBooks {
    findAllBookings {
      _id
      date
      time
      address
      lat
      lng
      createdAt
      completed
      assigned
    }
  }
`;

export const QUERY_UNASSIGNED_BOOKINGS = gql`
  query findUserBooks($assigned: Boolean) {
    findUnassignedBookings(assigned: $assigned) {
      _id
      date
      time
      address
      lat
      lng
      createdAt
      completed
      assigned
    }
  }
`;