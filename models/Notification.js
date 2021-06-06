const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: {
        type: String,
        required: [true,"title is empty !"]
    },
    content: {
        type: String,
        required: [true,"content is empty !"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true,"user is empty !"]
    },
    profilePicture:{
        type : String,
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true,
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;