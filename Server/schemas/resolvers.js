const { AuthenticationError } = require('apollo-server-express');
const { User, Address, Run } = require('../models');
const Booking = require('../models/Booking')
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'mysecretssshhhhhhh';
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('runs');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('runs');
    },
    admins: async () => {
      return User.find({ userType: 'ADMIN' }).populate('employees');
    },
    adminemployees: async (parent, { username }) => {
      return User.findOne({ username }).populate('employees').populate('runs');
    },
    runs: async () => {
      return Run.find();
    },
    employeeruns: async (parent, { employeeId }) => {
      return User.findOne({ _id: employeeId }).populate('runs');
    },
    run: async (parent, { runId }) => {
      return Run.findOne({ _id: runId });
    },
    findAllBookings: async () => {
      return Booking.find();
    },
    findUnassignedBookings: async (parent, { assigned }) => {
      let bookings;
      if (typeof assigned === 'boolean') {
        bookings = await Booking.find({ assigned });
      } else {
        bookings = null
      }
      return bookings;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'aud',
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100,
          },
          quantity: product.quantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      return { session: session.id };
    },
    findUserBooks: async (_, { userId }, context) => {
      const user = await User.findById(userId).populate('bookings');
      return user.bookings;
    },
  },

  Mutation: {

  },
};

module.exports = resolvers;
