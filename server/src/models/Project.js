const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    inviteKey: {
        type: String,
        default: null
    },
    members: [
        {
            memberId: String,
            role: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Project', ProjectSchema);
