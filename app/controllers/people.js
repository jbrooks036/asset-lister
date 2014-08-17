'use strict';

var Person = require('../models/person');

exports.init = function(req, res){
  res.render('people/init');
};

exports.create = function(req, res){
  var p = new Person(req.body);
  p.save(function(){
    res.redirect('/people');
  });
};

exports.index = function(req, res){
  Person.all(function(people){
    console.log(people);
    res.render('people/index', {people:people});
  });
};

exports.show = function(req, res){
  Person.findById(req.params.id, function(person){
    res.render('people/show', {person:person});
  });
};
