class ListController {
  constructor (servicesList, listEntity) {
    this._service = servicesList
    this._entity = listEntity
  }

  getAllLists () {
    const response = this._service.all('list')
    return response
  }

  getList (id) {
    const response = this._service.getItem('list', id)
    return response
  }

  createNewList (list) {
    const newList = new this._entity(list)
    const response = this._service.save('list', newList)
    return response
  }

  deleteList (id) {
    const response = this._service.delete('list', id)
    return response
  }

  updateList (list, id) {
    const newList = new this._entity(list)
    const response = this._service.update('list', newList, id)
    return response
  }
}

export default ListController
