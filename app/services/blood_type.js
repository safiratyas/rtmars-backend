const blood_repo = require("../repositories/blood_type");

module.exports = {
  create(requestBody) {
    return blood_repo.create(requestBody);
  },

  delete(id) {
    return blood_repo.delete(id);
  },

  async list() {
    const bloodType = await blood_repo.findAll();
    const bloodTypeCount = await blood_repo.getTotalBloodTypes();

    return {
      data: bloodType,
      count: bloodTypeCount
    }
  },

  get(id) {
    return blood_repo.find(id)
  },

  getOne(key) {
    return blood_repo.findOne(key)
  }
}