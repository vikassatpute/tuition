'use strict';

exports = module.exports = function(app, mongoose) {
  var classesSchema = new mongoose.Schema({
    title: { type: String, default:'', required: true},
    description: { type: String, default:''},
    image_url: { type: String, default:''},
    address: { type: String, default:''},
    date: { type: Date, default:''},
    time: { type: Date, default:''},
    cost: { type: String, default:''},
    note: { type: String, default:''},
    teacher: { type: String, default:''},
    phone: { type: String, default:''},
    map: { type: String, default:''},
    offer: { type: String, default:''},
    active: { type: String, default:'no'},
    timeCreated: { type: Date, default: Date.now }
  });

  // classesSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Classes', classesSchema);
};
