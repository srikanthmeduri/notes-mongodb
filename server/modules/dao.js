'use strict';

var Note = require('./models');

exports.addNote = function (obj, callback) {
    var p = new Note(obj);
    p.save(function (err, result) {
        if (!err && result) {
            callback('success', result);
        } else {
            callback('failure', err);
        }
    });
};

exports.getNotes = function (callback) {
    Note.find({}, function (err, result) {
        if (!err && result) {
            callback('success', result);
        } else {
            callback('failure', err);
        }
    });

};

exports.editNote = function (o, callback) {
    Note.findById(o._id, function (err, p) {
        if (!err && p) {
            p.desc = o.desc;
            p.editable = o.editable;
            p.title = o.title;
            p.updated = o.updated;
            p.save(function (err, result) {
                if (!err) {
                    callback('success', result);
                } else {
                    callback('failure', err);
                }
            });
        } else {
            callback('failure', err);
        }
    });
};