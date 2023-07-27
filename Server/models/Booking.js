const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bookingSchema = new Schema({
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    completed: {
        type: Boolean,
        default: false,
    },
    assigned: {
        type: Boolean,
        default: false,
    },
    runId: {
      type: String
    }
  });
  
  const Booking = model('booking', bookingSchema);
  
  module.exports = Booking;
