"use strict";
exports.__esModule = true;
require("colors");
var _ = require("lodash");
var getToEqual = function (value) {
    return function (expectedValue) {
        if (!_.isEqual(value, expectedValue)) {
            throw new Error(("Expected " + expectedValue + " to equal " + value).yellow);
        }
    };
};
var getNotToEqual = function (value) {
    return function (expectedValue) {
        if (_.isEqual(value, expectedValue)) {
            throw new Error(("Expected " + expectedValue + " not to equal " + value).yellow);
        }
    };
};
function expect(value) {
    return {
        toEqual: getToEqual(value),
        notToEqual: getNotToEqual(value)
    };
}
exports.expect = expect;
