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
    updateBookingAssigned: async (_, { bookingId, assigned, runId }, context) => {
      return await Booking.findByIdAndUpdate(
        bookingId,
        { assigned,
          runId
         },
        { new: true }
      );
    },
    addBooking: async (_, { userId, date, time, address, lat, lng }, context) => {
      const booking = await Booking.create({ date, time, address, lat, lng });
      await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });
      return booking;
    },
    addClient: async (parent, { username, email, password, userType }) => {

      const user = await User.create({ username, email, password, userType });
      
      const token = signToken(user);
      return { token, user };
    },
    updateProfile: async (parent, {userId, username, email}, context) => {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }
    
      user.username = username;
      user.email = email;

      const updatedUser = await user.save();

      const token = signToken(updatedUser);
      return { user: updatedUser, token};
    },
    addUser: async (parent, { admin, username, email, password, userType }) => {

      const user = await User.create({ username, email, password, userType });

        await User.findOneAndUpdate(
          { username: admin },
          { $addToSet: { employees: user._id } }
        );

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addRun: async (parent, { userId }) => {
      const newRun = await Run.create({ });
    
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { runs: newRun._id } }
      );
     
      return newRun;
    },   
    approveRun: async (parent, { runId }) => {
      try {
        const run = await Run.findById(runId);
        if (!run) {
          throw new Error('Run not found');
        }

        run.approved = true;
        await run.save();

        return run;
      } catch (err) {
        throw new Error('Failed to approve run');
      }
    }, 
    addAddress: async (parent, { runId, address, lat, lng, bookingId, assigned}) => {
      const addressAdded = await Run.findOneAndUpdate(
        { _id: runId },
        {
          $addToSet: { 
            addresses: { 
              address: address, 
              latlng: {
                lat: lat,
                lng: lng
              },
              bookingId: bookingId
            }
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      const bookingAdded = await Booking.findByIdAndUpdate(
        bookingId,
        { assigned,
          runId
         },
        { new: true }
      );

      return {addressAdded, bookingAdded }
    },
    removeRun: async (parent, { runId }) => {
      const removedRun = await Run.findOneAndDelete({ _id: runId });

      await User.findOneAndUpdate(
        { runs: runId },
        { $pull: { runs: runId } },
        { new: true }
      );

      return removedRun;
    },
    removeEmployee: async (parent, { admin, userId }) => {

      const removedUser = await User.findOneAndDelete({ _id: userId });

      await User.findOneAndUpdate(
        { username: admin },
        { $pull: { employees: userId } },
        { new: true }
      );

      return removedUser;
    },
    removeAddress: async (parent, { runId, addressId, bookingId, assigned }) => {
      const addressRemoved = await Run.findOneAndUpdate(
        { _id: runId },
        { $pull: { addresses: { _id: addressId } } },
        { new: true }
      );
      const bookingRemoved = await Booking.findByIdAndUpdate(
        bookingId,
        { assigned,
          runId
         },
        { new: true }
      );

      return {addressRemoved, bookingRemoved }
    },
  },
};

module.exports = resolvers;
