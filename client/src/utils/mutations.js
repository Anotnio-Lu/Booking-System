import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($admin: String!, $username: String!, $email: String!, $password: String!, $userType: UserType!) {
    addUser(admin: $admin, username: $username, email: $email, password: $password, userType: $userType) {
      token
      user {
        _id
        username
        email
        userType
      }
    }
  }
`;

export const ADD_ADDRESS = gql`
  mutation addAddress($runId: ID!, $address: String!, $lat: String!, $lng: String!, $bookingId: String, $assigned: Boolean) {
    addAddress(runId: $runId, address: $address, lat: $lat, lng: $lng, bookingId: $bookingId, assigned: $assigned) {
      _id
      addresses {
        _id
        address
        latlng {
          lat
          lng
        }
        bookingId
      }
      approved
    }
  }
`;

export const ADD_RUN = gql`
  mutation addRun($userId: ID!) {
    addRun(userId: $userId) {
      _id
      createdAt
      addresses {
        address
      }
    }
  }
`;

export const REMOVE_ADDRESS = gql`
  mutation removeAddress($runId: ID!, $addressId: ID!, $bookingId: String, $assigned: Boolean) {
    removeAddress(runId: $runId, addressId: $addressId, bookingId: $bookingId, assigned: $assigned) {
      _id
      createdAt
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

export const APPROVE_RUN = gql`
  mutation approveRun($runId: ID!) {
    approveRun(runId: $runId) {
      _id
      approved
      addresses {
        address
      }
    }
  }
`;

export const REMOVE_EMPLOYEE = gql`
  mutation removeEmployee($admin: String!, $userId: String!) {
    removeEmployee(admin: $admin, userId: $userId) {
      username
      _id
      employees {
        username
        _id
      }
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation removeEmployee($username: String!, $email: String!, $password: String!, $userType: UserType!) {
    addClient(username: $username, email: $email, password: $password, userType: $userType) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($userId: ID!, $username: String!, $email: String!) {
    updateProfile(userId: $userId, username: $username, email: $email) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation addBooking($userId: ID!, $date: String!, $time: String!, $address: String!, $lat: String!, $lng: String!) {
    addBooking(userId: $userId, date: $date, time: $time, address: $address, lat: $lat, lng: $lng) {
      _id
      address
      assigned
      completed
      createdAt
      date
      lat
      lng
      time
    }
  }
`;

export const ASSIGN_BOOKING = gql`
  mutation updateBookingAssigned($bookingId: ID!, $assigned: Boolean!, $runId: ID) {
    updateBookingAssigned(bookingId: $bookingId, assigned: $assigned, runId: $runId) {
      _id
      date
      time
      address
      lat
      lng
      createdAt
      completed
      assigned
      runId
    }
  }
`;