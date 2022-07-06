import fs from 'fs'

export class DataJson {
  constructor () {
    this._dataPath = './store/db.json'
    this.setTables()
  }

  setTables () {
    const tables = {
      album: [],
      artist: [],
      genre: [],
      list: [],
      song: [],
      user: []
    }

    const items = this.readJsonFile()
    if (items.length === 0) {
      this.writeJsonFile(tables)
    }
  }

  getItem (table, id) {
    return this.all(table).find(item => item._id === id)
  }

  all (table) {
    const items = this.readJsonFile()
    return items[table] || []
  }

  save (table, data) {
    const items = this.readJsonFile()
    data._id = this.generatePk(table)
    items[table].push(data)
    this.writeJsonFile(items)
    const str = table.charAt(0).toUpperCase() + table.slice(1)
    return `${str} item created`
  }

  delete (table, id) {
    const items = this.readJsonFile()
    const dataTable = items[table].filter(item => item._id !== id)
    items[table] = dataTable
    this.writeJsonFile(items)
    const str = table.charAt(0).toUpperCase() + table.slice(1)
    return `${str} item with id=${id} deleted`
  }

  update (table, data, id) {
    const items = this.readJsonFile()
    const dataTable = items[table].map(item => {
      if (item._id === id) {
        data._id = item._id
        item = data
      }

      return item
    })

    items[table] = dataTable
    this.writeJsonFile(items)
    const str = table.charAt(0).toUpperCase() + table.slice(1)
    return `${str} item with id=${id} modified`
  }

  generatePk (table) {
    const lastItem = this.all(table).pop()
    if (lastItem) {
      return ++lastItem._id
    }
    return 1
  }

  readJsonFile () {
    const contentFile = fs.readFileSync(this._dataPath, 'utf8')
    if (contentFile) {
      return JSON.parse(contentFile)
    }
    return []
  }

  writeJsonFile (data) {
    const jsonData = JSON.stringify(data, null, '')
    fs.writeFileSync(this._dataPath, jsonData)
  }

  findByAttribute (table, attribute, value) {
    const items = this.readJsonFile()
    const item = items[table].find(item => item[attribute] === value)
    if (item) {
      return item
    }

    return null
  }
}
