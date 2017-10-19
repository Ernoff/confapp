const participants = require('./participants/participants.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(participants);
};
