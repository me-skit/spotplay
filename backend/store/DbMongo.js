import mongoose from 'mongoose'
import { config } from '../config/default.js'
import { models } from './MongooseModels.js'

const mongodb = async () => {
  try {
    const db = await mongoose.connect(config.mongoConnection.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB connected: ${db.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export class DbMongo {
  constructor () {
    mongodb()
    this._models = models
  }

  async save (table, data) {
    const newUser = this._models[table](data)
    await newUser.save()
    return `Item created at ${table} table`
  }

  async all (table) {
    const result = await this._models[table].find()
    return result
  }

  async getItem (table, id) {
    const result = await this._models[table].findById(id)
    return result
  }

  async delete (table, id) {
    const result = await this._models[table].findByIdAndDelete(id)
    return result
  }

  async update (table, data, id) {
    Object.keys(data).forEach(key => {
      if (data[key] === null) {
        delete data[key]
      }
    })

    const result = await this._models[table].findByIdAndUpdate(id, data)
    return result
  }

  async findByAttribute (table, attrib, value) {
    const query = {}
    query[attrib] = value
    const result = await this._models[table].find(query)
    return result
  }
}
