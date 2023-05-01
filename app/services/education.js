const education_repo = require("../repositories/education");

module.exports = {
  create(requestBody) {
    return education_repo.create(requestBody);
  },

  delete(id) {
    return education_repo.delete(id);
  },

  async list() {
    const education = await education_repo.findAll();
    const educationCount = await education_repo.getTotalEducations();

    return {
      data: education,
      count: educationCount
    }
  },

  get(id) {
    return education_repo.find(id)
  },

  getOne(key) {
    return education_repo.findOne(key)
  }
}