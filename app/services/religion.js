const religion_repo = require("../repositories/religion");

module.exports = {
  create(requestBody) {
    return religion_repo.create(requestBody);
  },

  delete(id) {
    return religion_repo.delete(id);
  },

  async list() {
    const religion = await religion_repo.findAll();
    const religionCount = await religion_repo.getTotalReligions();

    return {
      data: religion,
      count: religionCount
    }
  },

  get(id) {
    return religion_repo.find(id)
  },

  getOne(key) {
    return religion_repo.findOne(key)
  }
}