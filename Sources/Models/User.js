import mongoose from 'mongoose'
const  { Schema, model } = mongoose

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: ''},
    name: { type: String, default: ''},
    surname: { type: String, default: ''},
    street: { type: String, default: ''},
    zip: { type: String, default: ''},
    city: { type: String, default: ''},
    country: { type: String, default: ''},
    state: { type: String, default: ''},
    passwordHash: { type: String, required: true }
})

export default model('User', schema)