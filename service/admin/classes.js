'use strict';

// public api
var classesService = {
  find: function(req, res, next){
    req.app.db.models.Classes.find(function(err, classesService){
      if (err) {
        return err;
      }
      return res.json(classesService);
    })
  },
  findById: function(req, res, next){
    // console.log('req.body:: ',req.body);
    // return req.body;
    req.app.db.models.Classes.findById(req.params.id, function(err, classesService){
      if (err) {
        return err;
      }
      return res.json(classesService);
    })
  },
  update: function(req, res, next){
    // console.log('req.body:: ',req.body);
    // return req.body;
    // req.app.db.models.Classes.findById(req.params.id, function(err, classesService){
    var fieldsToSet = {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      address: req.body.address,
      active: req.body.active
    }
    var options = { new: true };
    req.app.db.models.Classes.findByIdAndUpdate(req.params.id, fieldsToSet, options, function(err, classesService) {
      if (err) {
        return err;
      }
      return res.json(classesService);
    })
  },
  addClass: function (req, res, next) {
    var classObj = req.body;
    req.app.db.models.Classes.create(req.body, function(err, classesService) {
      if (err) {
        return err;
      }
      return res.json(classesService);
    });
  }
};
module.exports = classesService;