'use strict';

var async = require("async");
var beforefn = require("beforefn");
var beforecb = require("beforecb");

var original = async.series;
async.series = function (functionsArray, next) {
    var timer = {};
    timer.tasks = [];
    var wrappedFunctions = [];
    
    functionsArray.forEach(function (func) {
        var taskTimer = {};
        timer.tasks.push(taskTimer);
        var wrappedFunc = beforefn(func, function() {
            taskTimer.start = Date.now(); 
        });
        wrappedFunc = beforecb(wrappedFunc, function() {
            taskTimer.time = Date.now() - taskTimer.start;
        });
        wrappedFunctions.push(wrappedFunc);
    });
    
    timer.start = Date.now();
    var wrappedOriginal = beforecb(original, function() {
        timer.time = Date.now() - timer.start;
    });
    setTimeout(wrappedOriginal.bind(this, wrappedFunctions, next));
    return timer;
};

module.exports = async;