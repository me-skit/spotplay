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
    // return JSON.stringify(result)
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
}

// mongodb()
// const test = new DBMongo()
// test.insertData('user', {
//   _username: 'Test4',
//   _email: 'test4@mail.com',
//   _passwrod: 'Admin123*'
// }).then(result => console.log(result), error => console.log(error))

// test.all('user').then(result => console.log(result), error => console.log(error))

// test.delete('user', '62c7165b347bcd35a16a5390').then(result => console.log(result), error => console.log(error))

// test.all('user').then(result => console.log(result), error => console.log(error))

// test.update('user', '62c716c4165a5e3e362f383e', {
//   _username: 'Test3',
//   _email: 'test3@gmail.com'
// }).then(result => console.log(result), error => console.log(error))

// test.all('user').then(result => console.log(result), error => console.log(error))
// test.getItem('user', '62c716c4165a5e3e362f383e').then(result => console.log(result), error => console.log(error))
