import mongoose from 'mongoose'
const  { Schema, model } = mongoose

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    asssetName: { type: String, required: true, unique: true },
    text: { type: String, required: true},
    linkTitle: { type: String, required: true },
    linkTo: { type: String, required: true },
    date: { type: Date, default: Date.now},
    clicks: { type: Number, default: 0}
})

export default model('Post', schema)