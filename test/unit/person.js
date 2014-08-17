/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Person    = require('../../app/models/person'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'assets';

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Person object', function(){
      var o = {name:'Betty Boop', cash:'3000'};
      var p = new Person(o);
      expect(p).to.be.instanceof(Person);
      expect(p.name).to.equal('Betty Boop');
      expect(p.cash).to.equal(3000);
    });
  });

  describe('#save', function(){
    it('should save a person to the database', function(done){
      var o = {name:'Betty Boop', cash:'3000'};
      var p = new Person(o);
      p.save(function(){
        expect(p._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });


  describe('.all', function(){
    it('should get all people from database', function(done){
      Person.all(function(people){
        expect(people).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a person by their id', function(done){
      Person.findById('000000000000000000000001', function(p){
        expect(p.name).to.equal('Bob Jones');
        expect(p.cash).to.be.closeTo(30000, 0.1);
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete an item by its id', function(done){
      Person.deleteById('000000000000000000000001', function(){
        Person.all(function(people){
          expect(people).to.have.length(2);
          done();
        });
      });
    });
  });

});

