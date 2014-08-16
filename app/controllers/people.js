'use strict';

//var Person = require('../models/person');

exports.init = function(req, res){
  res.render('people/init');
};

exports.index = function(req, res){
  res.render('people/index');
};

