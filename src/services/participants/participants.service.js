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
    definitions: {
      "ApiResponse" : {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "lc": {"type": "string"},
          "role": { "type": "string"},
          "comingas": { "type": "string"}
        }
      },
      participants:{
        "type": "object",
        "required": [
          "name", "lc", "role", "comingas"
        ],
        "properties":{
          "name": {
            "type": "string",
            "description": "name of the the participants"
          },
          "funcArea": {
            "type":"string",
            "description": "the functional area they belong to"
          },
          "funFact": {
            "type": "string",
            "description": "interesting facts about the participants"
          },
          "lc": {
            "type": "string",
            "description": "The home LC they belong to. Return Nigeria if part of the MC"
          },
          "role": {
            "type": "string",
            "description": "What do you do in your committee"
          },
          "comingas": {
            "type": "string",
            "description": "Are you a facilitator or a delegate?",
            "enum": ["faci", "delegate"]
          }
        }
      }
    },
    find: {
      parameters: [
        {
          description: 'Get all participants',
          in: 'query',
          name: '',
          // schema : {
          //   $ref: "#/definitions/participants list",
          //   type: "array"
          // }
        }
      ],
      responses: {
        200:{
          description: "successful operation",
          schema : {
            $ref: "#/definitions/participants",
            type: "array"
          }
        },
      }
    },
    create: {
      produces:["application/json"],
      parameters: [
        {
          description: 'Participant Objects that needs to be added to database',
          in: 'body',
          name: 'body',
          required: true,
          schema : {
            $ref: "#/definitions/participants",
            type: "array"
          }
        }
      ]
    },
    "/participants/{lc}": {
      "get":{
        parameters : [
          {
            description: 'Get all participants', in: 'path',
            name: 'lc',
            type: 'string',
          }
        ],
        tags: ["participants"]
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
