import { model, Schema } from 'mongoose';

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    lastLogin: { type: Date, default: null }
},
    { timestamps: true },
);

export default model('User', userSchema)