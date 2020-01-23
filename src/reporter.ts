import "colors";
import { TestRunner } from "./runner";
import { Test, TestGroup } from "./types";

const indent: string = "  ";

export class Reporter {
  testRunner: TestRunner;

  constructor(testRunner) {
    this.testRunner = testRunner;
    this.initEventListeners();
  }

  printSummary = () => {
    let totalCount: number = 0;
    let passedCount: number = 0;
    let failedCount: number = 0;
    this.testRunner.suite.forEach(testGroup => {
      totalCount += testGroup.tests.length;
      testGroup.tests.forEach(test => {
        if (test.result.passed) passedCount += 1;
        else {
          console.log(`\n ○ ${testGroup.description}. ${test.description}`.red);
          console.log(`\n${test.result.error.stack}`);
          failedCount += 1;
        }
      });
    });
    console.log(`\n Total tests run: ${totalCount}`.yellow);
    console.log(` Passing tests: ${passedCount}`.green);
    console.log(` Failing tests: ${failedCount}\n`.red);
  };

  handleTestGroupStarted = (testGroup: TestGroup) => {
    console.log(`\n ${testGroup.description}`.grey);
  };

  handleTestGroupCompleted = () => {};

  handleTestRunStarted = () => {
    console.log("\n [Pretzel 🥨]: Starting test run...".yellow);
  };

  handleTestRunCompleted = () => {
    console.log("\n [Pretzel 🥨]: Test run completed.\n".yellow);
    console.log("\n Summary:".yellow);
    this.printSummary();
  };

  handleAfterBlockError = error => {
    console.log("There was an error in an after block...");
  };

  handleSingleTestCompleted = (test: Test) => {
    if (test.result.passed) {
      console.log(`   ○ ${test.description} ✓`.grey);
    } else {
      console.log(`   ○ ${test.description} ✖`.red);
    }
  };

  initEventListeners() {
    const {
      testRunStarted,
      testRunCompleted,
      afterBlockError,
      singleTestCompleted,
      testGroupStarted,
      testGroupCompleted
    } = TestRunner.events;
    this.testRunner.on(testRunStarted, this.handleTestRunStarted);
    this.testRunner.on(testRunCompleted, this.handleTestRunCompleted);
    this.testRunner.on(afterBlockError, this.handleAfterBlockError);
    this.testRunner.on(testGroupStarted, this.handleTestGroupStarted);
    this.testRunner.on(testGroupCompleted, this.handleTestGroupCompleted);
    this.testRunner.on(singleTestCompleted, this.handleSingleTestCompleted);
  }
}
