class ListController {
  constructor (servicesList, listEntity) {
    this._service = servicesList
    this._entity = listEntity
  }

  getAllLists () {
    const response = this._service.all('playlist')
    return response
  }

  getList (id) {
    const response = this._service.getItem('playlist', id)
    return response
  }

  createNewList (list) {
    const newList = new this._entity(list)
    const response = this._service.save('playlist', newList)
    return response
  }

  deleteList (id) {
    const response = this._service.delete('playlist', id)
    return response
  }

  updateList (list, id) {
    const newList = new this._entity(list)
    const response = this._service.update('playlist', newList, id)
    return response
  }
}

export default ListController
