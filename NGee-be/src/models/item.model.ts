import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: { type: String, required: 'name is required!' },
  kolor: { type: String, required: 'kolor is required!' },
  cena: { type: Number, required: 'cena is required!' }
})

export const ItemModel = mongoose.model('items', itemSchema) // w stringu nazwa kolekcji!
