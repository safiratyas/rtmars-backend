const administrator_repo = require("../repositories/administrator");

module.exports = {
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