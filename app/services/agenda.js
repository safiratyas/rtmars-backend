const agenda_repo = require("../repositories/agenda");

module.exports = {
  create(requestBody) {
    return agenda_repo.create(requestBody);
  },

  update(id, requestBody) {
    return agenda_repo.update(id, requestBody);
  },

  delete(id) {
    return agenda_repo.delete(id);
  },
  
  async list() {
    const agenda = await agenda_repo.findAll();
    const agendaCount = await agenda_repo.getTotalAgendas();

    return {
      data: agenda,
      count: agendaCount
    }
  },

  get(id) {
    return agenda_repo.find(id)
  },

  getOne(key) {
    return agenda_repo.findOne(key)
  }
}