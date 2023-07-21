const administrator_repo = require("../repositories/administrator");

module.exports = {
  create(requestBody) {
    return administrator_repo.create(requestBody);
  },

  update(id, requestBody) {
    return administrator_repo.update(id, requestBody);
  },

  delete(id) {
    return administrator_repo.delete(id);
  },
  
  async list() {
    const admin = await administrator_repo.findAll();
    const adminCount = await administrator_repo.getTotalAdmins();

    return {
      data: admin,
      count: adminCount
    }
  },

  get(id) {
    return administrator_repo.find(id)
  },

  getOne(key) {
    return administrator_repo.findOne(key)
  }
}