class ListController {
  constructor (servicesList, listEntity) {
    this._service = servicesList
    this._entity = listEntity
  }

  async getAllLists () {
    const response = await this._service.all('list')
    return response
  }

  async getList (id) {
    const response = await this._service.getItem('list', id)
    return response
  }

  async createNewList (list) {
    const newList = new this._entity(list)
    const response = await this._service.save('list', newList)
    return response
  }

  async deleteList (id) {
    const response = await this._service.delete('list', id)
    return response
  }

  async updateList (list, id) {
    const newList = new this._entity(list)
    const response = await this._service.update('list', newList, id)
    return response
  }
}

export default ListController
