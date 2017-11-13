// participants-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const participants = new Schema({
    name: { type: String, required: true },
    funcArea: { type: String },
    funFact: { type: String },
    lc: { type: String, required: true },
    role: { type: String, required: true },
    comingas: { type: String, required: true , 
      enum: ['delegate', 'faci'], default: 'delegate'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('participants', participants);
};
