const citizen_repo = require("../repositories/citizen");

module.exports = {
  create(requestBody) {
    return citizen_repo.create(requestBody);
  },

  update(id, requestBody) {
    return citizen_repo.update(id, requestBody);
  },

  delete(id) {
    return citizen_repo.delete(id);
  },

  async list() {
    const citizen = await citizen_repo.findAll();
    const citizenCount = await citizen_repo.getTotalCitizens();

    return {
      data: citizen,
      count: citizenCount
    }
  },

  get(id) {
    return citizen_repo.find(id)
  },

  getOne(key) {
    return citizen_repo.findOne(key)
  }
}