const job_repo = require("../repositories/job");

module.exports = {
  create(requestBody) {
    return job_repo.create(requestBody);
  },

  delete(id) {
    return job_repo.delete(id);
  },

  async list() {
    const job = await job_repo.findAll();
    const jobCount = await job_repo.getTotalJobs();

    return {
      data: job,
      count: jobCount
    }
  },

  get(id) {
    return job_repo.find(id)
  },

  getOne(key) {
    return job_repo.findOne(key)
  }
}