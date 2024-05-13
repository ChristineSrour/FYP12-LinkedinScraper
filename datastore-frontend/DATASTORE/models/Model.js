const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true

    },
    coordinates: {
        type: [Number], // Array of numbers for coordinates
        required: true // Coordinates are required
    },
    education: [
        {
            instituteName: {
                type: String,
                required: true
            },
            major: {
                type: String,
                required: true
            },
            dates: {
                type: String,
                required: true
            }
        }
    ],
    experience: [
        {
            position: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            dates: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.index({ url: 1 });

module.exports = mongoose.model('Data', userSchema)