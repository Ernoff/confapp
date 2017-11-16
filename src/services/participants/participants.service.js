// Initializes the `participants` service on path `/participants`
const createService = require('feathers-mongoose');
const createModel = require('../../models/participants.model');
const hooks = require('./participants.hooks');
const filters = require('./participants.filters');
// const path = require('path');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'participants',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  // app.use('/participants', createService(options));
  const participants = createService(options);
  participants.docs = {
    tags: {
          summary: 'Retrieves a list of all participants',
          description: ''
        },
    find: {
      produces: [
        'application/json'
      ],
      parameters: [
        {
          description: 'Return all participants',
          in: 'query'
        }
      ]
    }
  }

  app.use('/participants', participants);
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('participants');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
