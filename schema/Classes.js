'use strict';

exports = module.exports = function(app, mongoose) {
  var classesSchema = new mongoose.Schema({
    title: { type: String, default:'', required: true},
    description: { type: String, default:''},
    image_url: { type: String, default:''},
    address: { type: String, default:''},
    timeCreated: { type: Date, default: Date.now }
  });

  // classesSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Classes', classesSchema);
};
