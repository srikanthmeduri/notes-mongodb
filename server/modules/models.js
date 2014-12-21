'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {type: String, required: true, trim: true},
    desc: {type: String, required: true, trim: true},
    editable: {type: Boolean, required: true},
    created: {type: Date, required: true, default: Date.now},
    updated: {type: Date}
});

module.exports = mongoose.model('Note', NoteSchema);
