'use strict';

exports.handleErrors = function(msg, obj, callback) {
    var res = {
        message:msg,
        data:obj
    };
    callback(res);
};