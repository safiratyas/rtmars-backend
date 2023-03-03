const adminRepository = require("../repositories/admin");

module.exports = {
  async list() {
    const admin = await adminRepository.findAll();
    const adminCount = await adminRepository.getTotalAdmins();

    return {
      data: admin,
      count: adminCount
    }
  },

  get(id) {
    return adminRepository.find(id)
  },

  getOne(key) {
    return adminRepository.findOne(key)
  }
}