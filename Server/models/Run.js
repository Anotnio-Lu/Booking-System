const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// const addressSchema = require('./Address');

const runSchema = new Schema({
    addresses: [
        {
            address: {
                type: String,
                required: true,
            },
            latlng:
                {    
                  lat: {
                    type: String,
                    required: true,
                  },
                  lng: {
                    type: String,
                    required: true,
                  }
                },
            bookingId: {
                  type: String
                },
        }
    ],
    createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Run = model('Run', runSchema);

module.exports = Run;
