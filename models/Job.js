const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    started: {
        type: Date,
        required: true,
    },
    left: {
        type: Date,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User',
        required: true,
    }
}, {
    timestamps: true,
});

const Job = mongoose.model("Job",jobSchema);

module.exports = Job;