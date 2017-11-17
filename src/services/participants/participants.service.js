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
    find: {
      parameters: [
        {
          description: 'Get all participants',
          in: 'query',
          name: ''
        }
      ]
    },
    create: {
      parameters: [
        {
          description: 'Participant Objects that needs to be added to database',
          in: 'body',
          name: 'body',
          required: true,
          schema : {
            $ref: "#/definitions/Participants",
            type: "array"
          }
        }
      ],
      responses: {
        201: {
          description: "Hell yeah its been created"
        }
      }
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
