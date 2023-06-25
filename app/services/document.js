const document_repo = require("../repositories/document");

module.exports = {
  create(requestBody) {
    return document_repo.create(requestBody);
  },

  update(id, requestBody) {
    return document_repo.update(id, requestBody);
  },

  delete(id) {
    return document_repo.delete(id);
  },

  async list() {
    const document = await document_repo.findAll();
    const documentCount = await document_repo.getTotalDocuments();

    return {
      data: document,
      count: documentCount
    }
  },

  get(id) {
    return document_repo.find(id)
  },

  getOne(key) {
    return document_repo.findOne(key)
  }
}