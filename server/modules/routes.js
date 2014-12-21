'use strict';

var Note = require('./models');
var noteService = require('./services');

module.exports = function(app) {

    app.post('/addNote', function(req, res) {
        noteService.addNote(req.body, function(returnValue) {
            res.json(returnValue);
        });
    });

    app.get('/getNotes', function(req, res) {
        noteService.getNotes(function(returnValue) {
            res.json(returnValue);
        });
    });

    app.post('/editNote', function(req, res) {
        noteService.editNote(req.body, function(returnValue) {
            res.json(returnValue);
        });
    });

};
