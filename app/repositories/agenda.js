const {
  Agenda
} = require("../models");

module.exports = {
  create(inputData) {
    return Agenda.create(inputData);
  },

  update(id, updateData) {
    return Agenda.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Agenda.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Agenda.findByPk(id);
  },

  findAll() {
    return Agenda.findAll();
  },

  findOne(key) {
    return Agenda.findOne(key);
  },

  getTotalAgendas() {
    return Agenda.count();
  },
};