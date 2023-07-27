const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    userType: UserType!
    employees: [User]
    runs: [Run]
    bookings: [Booking]
  }

  enum UserType {
    ADMIN
    EMPLOYEE
    CLIENT
  }

  type Booking {
    _id: ID!
    date: String!
    time: String!
    address: String!
    lat: String
    lng: String
    createdAt: String!
    completed: Boolean
    assigned: Boolean
    runId: String
  }

  type Run {
    _id: ID
    createdAt: String
    addresses: [Address]
    approved: Boolean
  }

  type Address {
    _id: ID
    address: String
    latlng: LatLng
    bookingId: String
  }

  type LatLng {
    lat: String
    lng: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  input ProductInput {
    _id: ID
    name: String
    price: Float
    quantity: Int
  }

  type Query {
    users: [User]
    user(userId: ID): User
    admins: [User]
    adminemployees(username: String!): User
    runs: [Run]
    run(runId: ID): Run
    employeeruns(employeeId: ID): User
    checkout(products: [ProductInput]): Checkout
    findUserBooks(userId: ID!): [Booking]
    findAllBookings(assigned: Boolean): [Booking]
    findUnassignedBookings(assigned: Boolean): [Booking]
  }

  type Mutation {
    addUser(admin: String!, username: String!, email: String!, password: String!, userType: UserType!): Auth
    addClient(username: String!, email: String!, password: String!, userType: UserType!): Auth
    login(email: String!, password: String!): Auth
    approveRun(runId: ID!): Run
    addRun(userId: ID): Run
    addAddress(runId: ID!, address: String!, lat: String!, lng: String!, bookingId: String, assigned: Boolean): Run
    removeRun(runId: ID!): Run
    removeAddress(runId: ID!, addressId: ID!, bookingId: String, assigned: Boolean): Run
    removeEmployee(admin: String!, userId: String!): User
    updateProfile(userId: ID!, username: String!, email: String!): Auth
    addBooking(userId: ID!, date: String!, time: String!, address: String!, lat: String!, lng: String!): Booking
    updateBookingAssigned(bookingId: ID!, assigned: Boolean!, runId: ID): Booking
  }
`;

module.exports = typeDefs;