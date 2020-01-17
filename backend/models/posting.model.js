const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    createdby: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number },
    comments: { type: Number},
}, {
    timestamps: true
});

const Posting = mongoose.model('Posting', postingSchema);

module.exports = Posting;