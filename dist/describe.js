"use strict";
exports.__esModule = true;
var runner_1 = require("./runner");
var getInitialTestGroup = function (description) {
    return {
        description: description,
        tests: [],
        before: [],
        beforeEach: [],
        after: [],
        afterEach: []
    };
};
function before(fn) {
    this.currentTestGroup.before.push(fn);
    return this;
}
exports.before = before;
function after(fn) {
    this.currentTestGroup.after.push(fn);
    return this;
}
exports.after = after;
function beforeEach(fn) {
    this.currentTestGroup.beforeEach.push(fn);
    return this;
}
exports.beforeEach = beforeEach;
function afterEach(fn) {
    this.currentTestGroup.afterEach.push(fn);
    return this;
}
exports.afterEach = afterEach;
function test(description, fn) {
    this.currentTestGroup.tests.push({
        description: description,
        fn: fn,
        result: {
            type: null,
            error: null,
            beforeError: null,
            beforeEachError: null,
            afterError: null,
            afterEachError: null
        }
    });
    return this;
}
exports.test = test;
function describe(description) {
    var currentTestGroup = getInitialTestGroup(description);
    runner_1.testRunner.pushTestGroup(currentTestGroup);
    return {
        currentTestGroup: currentTestGroup,
        it: test,
        "case": test,
        before: before,
        beforeEach: beforeEach,
        after: after,
        afterEach: afterEach
    };
}
exports.describe = describe;
