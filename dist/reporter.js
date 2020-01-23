"use strict";
exports.__esModule = true;
require("colors");
var runner_1 = require("./runner");
var indent = "  ";
var Reporter = /** @class */ (function () {
    function Reporter(testRunner) {
        var _this = this;
        this.printSummary = function () {
            var totalCount = 0;
            var passedCount = 0;
            var failedCount = 0;
            _this.testRunner.suite.forEach(function (testGroup) {
                totalCount += testGroup.tests.length;
                testGroup.tests.forEach(function (test) {
                    if (test.result.passed)
                        passedCount += 1;
                    else {
                        console.log(("\n \u25CB " + testGroup.description + ". " + test.description).red);
                        console.log("\n" + test.result.error.stack);
                        failedCount += 1;
                    }
                });
            });
            console.log(("\n Total tests run: " + totalCount).yellow);
            console.log((" Passing tests: " + passedCount).green);
            console.log((" Failing tests: " + failedCount + "\n").red);
        };
        this.handleTestGroupStarted = function (testGroup) {
            console.log(("\n " + testGroup.description).grey);
        };
        this.handleTestGroupCompleted = function () { };
        this.handleTestRunStarted = function () {
            console.log("\n [Pretzel 🥨]: Starting test run...".yellow);
        };
        this.handleTestRunCompleted = function () {
            console.log("\n [Pretzel 🥨]: Test run completed.\n".yellow);
            console.log("\n Summary:".yellow);
            _this.printSummary();
        };
        this.handleAfterBlockError = function (error) {
            console.log("There was an error in an after block...");
        };
        this.handleSingleTestCompleted = function (test) {
            if (test.result.passed) {
                console.log(("   \u25CB " + test.description + " \u2713").grey);
            }
            else {
                console.log(("   \u25CB " + test.description + " \u2716").red);
            }
        };
        this.testRunner = testRunner;
        this.initEventListeners();
    }
    Reporter.prototype.initEventListeners = function () {
        var _a = runner_1.TestRunner.events, testRunStarted = _a.testRunStarted, testRunCompleted = _a.testRunCompleted, afterBlockError = _a.afterBlockError, singleTestCompleted = _a.singleTestCompleted, testGroupStarted = _a.testGroupStarted, testGroupCompleted = _a.testGroupCompleted;
        this.testRunner.on(testRunStarted, this.handleTestRunStarted);
        this.testRunner.on(testRunCompleted, this.handleTestRunCompleted);
        this.testRunner.on(afterBlockError, this.handleAfterBlockError);
        this.testRunner.on(testGroupStarted, this.handleTestGroupStarted);
        this.testRunner.on(testGroupCompleted, this.handleTestGroupCompleted);
        this.testRunner.on(singleTestCompleted, this.handleSingleTestCompleted);
    };
    return Reporter;
}());
exports.Reporter = Reporter;
