'use strict';

var noteDao = require('./dao');
var util = require('./util');

exports.addNote = function(obj, callback) {
    noteDao.addNote(obj, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.getNotes = function(callback) {
    noteDao.getNotes(function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};

exports.editNote = function(obj, callback) {
    noteDao.editNote(obj, function(msg, returnValue) {
        util.handleErrors(msg, returnValue, callback);
    });
};