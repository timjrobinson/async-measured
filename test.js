'use strict';

var test = require('tap').test;
var assert = require("assert");
var async = require("./index.js");

test("it should work with non-modified async functions", function (t) {
    var counter = 0;
    async.times(5, function(n, next) {
        counter++;
        next();
    }, function() {
        t.ok(counter, 5);
        t.end();
    });
});

test("It should add function timings for async.series", function (t) {
    var timer = async.series([
        function (next) {
            setTimeout(next, 100);
        },
        function (next) {
            setTimeout(next, 50);
        }
    ], function () {
        assert(Math.abs(timer.tasks[0].time - 100) < 5)
        assert(Math.abs(timer.tasks[1].time - 50) < 5)
        assert(Math.abs(timer.time - 150) < 10)
        t.end();
    });
});