import pg from 'pg'

export class DataPostgresql {
  // constructor () {
  //   this._pool = this.getConnection()
  // }

  async getConnection () {
    const pool = new pg.Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'dbspotplay'
    })

    return pool
  }

  async all (table) {
    try {
      const query = `SELECT * FROM ${table}`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      return resultPool.rows
    } catch (error) {
      console.log(error)
    }
  }

  async getItem (table, id) {
    try {
      const query = `SELECT * FROM ${table} WHERE _id = ${id}`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      return resultPool.rows.length ? resultPool.rows[0] : null
    } catch (error) {
      console.log(error)
    }
  }

  async save (table, data) {
    try {
      delete data._id // PostgreSQL don't need a null id which will just cause error
      const query = `INSERT INTO ${table} (${Object.keys(data).join(', ')}) VALUES (${Object.keys(data).map((current, index) => `$${index + 1}`).join(', ')})`
      console.log(query)
      const pooldb = await this.getConnection()
      await pooldb.query(query, Object.values(data))
      return `Item created at ${table} table`
    } catch (error) {
      console.log(error)
    }
  }

  async delete (table, id) {
    try {
      const query = `DELETE FROM ${table} WHERE _id = ${id}`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query)
      return resultPool.rowCount
    } catch (error) {
      console.log(error)
    }
  }

  async update (table, data, id) {
    try {
      delete data._id // PostgreSQL don't need a null id which will just cause error
      const query = `UPDATE ${table} SET ${Object.keys(data).map((current, index) => `${current}=$${index + 1}`).join(', ')} WHERE _id = ${id}`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, Object.values(data))
      return resultPool.rowCount
    } catch (error) {
      console.log(error)
    }
  }

  async findByAtribute (table, attribute, value) {
    console.log(table, attribute, value)
    try {
      const query = `SELECT * FROM ${table} WHERE ${attribute} = $1`
      const pooldb = await this.getConnection()
      const resultPool = await pooldb.query(query, [value])
      console.log(resultPool.rows)
      return resultPool.rows[0]
    } catch (error) {
      console.log(error)
    }
  }
}
