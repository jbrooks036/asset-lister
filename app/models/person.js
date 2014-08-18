'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Person(o){
  this.name = o.name;
  this.cash = o.cash * 1;
  // console.log('p constructor this');
  // console.log(this);
}

Object.defineProperty(Person, 'collection', {
  get: function(){return global.mongodb.collection('people');}
});

Person.prototype.save = function(cb){
  Person.collection.save(this, cb);
};

Person.all = function(cb){
  Person.collection.find().toArray(function(err,objects){
    var people = objects.map(function(o){
      return rePrototype(o);
    });

    cb(people);
  });
};

Person.findById = function(id, cb){
  console.log(id);
  var _id = Mongo.ObjectID(id);

  Person.collection.findOne({_id:_id}, function(err, obj){
    var p = rePrototype(obj);

    cb(p);
  });
};

Person.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Person.collection.findAndRemove({_id:_id}, cb);
};

module.exports = Person;

// PRIVATE FUNCTIONS

function rePrototype(obj){
  var p = _.create(Person.prototype, obj);
  return p;
}
