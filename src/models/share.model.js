const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            match: /^[A-Za-z0-9]{6}$/,
        },

        text: {
            type: String,
            required: true,
        },

        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 5 * 60 * 1000),
            index: {
                expires: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

const shareModel = mongoose.model("shares", shareSchema);

module.exports = shareModel;  