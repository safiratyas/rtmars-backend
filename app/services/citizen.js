const citizen_repo = require("../repositories/citizen");

module.exports = {
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