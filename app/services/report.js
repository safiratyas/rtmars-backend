const report_repo = require("../repositories/report");

module.exports = {
  create(requestBody) {
    return report_repo.create(requestBody);
  },

  update(id, requestBody) {
    return report_repo.update(id, requestBody);
  },

  delete(id) {
    return report_repo.delete(id);
  },

  async list() {
    const report = await report_repo.findAll();
    const reportCount = await report_repo.getTotalReports();

    return {
      data: report,
      count: reportCount
    }
  },

  get(id) {
    return report_repo.find(id)
  },

  getOne(key) {
    return report_repo.findOne(key)
  }
}