import * as glob from "glob";
import { Reporter } from "./reporter";
import { TestGroup, Test, Options } from "./types";
import { EventEmitter } from "events";

export class TestRunner extends EventEmitter {
  static events = {
    testRunStarted: "TEST_RUN_STARTED",
    testRunCompleted: "TEST_RUN_COMPLETED",
    afterBlockError: "AFTER_BLOCK_ERROR",
    testGroupStarted: "TEST_GROUP_STARTED",
    testGroupCompleted: "TEST_GROUP_COMPLETED",
    singleTestCompleted: "SINGLE_TEST_COMPLETED"
  };

  suite: TestGroup[];

  constructor(Reporter) {
    super();
    new Reporter(this);
    this.suite = [];
  }

  pushTestGroup(testGroup: TestGroup) {
    this.suite.push(testGroup);
  }

  buildSuite(options: Options) {
    const testFilePaths = glob.sync(options.matching, {
      root: options.rootDir,
    });
    testFilePaths.forEach(require);
  }

  async runBeforeEachBlocks(test: Test, testGroup: TestGroup) {
    try {
      for (const fn of testGroup.beforeEach) await fn();
    } catch (error) {
      test.result.beforeEachError = error;
    }
  }

  async runTestFn(test: Test) {
    try {
      await test.fn();
      test.result.passed = true;
    } catch (error) {
      test.result.passed = false;
      test.result.error = error;
    }
  }

  async runAfterEachBlocks(test: Test, testGroup: TestGroup) {
    try {
      for (const fn of testGroup.afterEach) await fn();
    } catch (error) {
      test.result.afterEachError = error;
    }
  }

  async runTests(testGroup: TestGroup) {
    for (const test of testGroup.tests) {
      await this.runBeforeEachBlocks(test, testGroup);
      await this.runTestFn(test);
      await this.runAfterEachBlocks(test, testGroup);
      this.emit(TestRunner.events.singleTestCompleted, test);
    }
  }

  async runBefore(testGroup: TestGroup) {
    try {
      for (const fn of testGroup.before) await fn();
    } catch (error) {
      testGroup.tests.forEach(test => {
        test.result.beforeError = error;
      });
    }
  }

  async runAfter(testGroup: TestGroup) {
    try {
      for (const fn of testGroup.after) await fn();
    } catch (error) {
      this.emit(TestRunner.events.afterBlockError, error);
      testGroup.tests.forEach(test => {
        test.result.beforeError = error;
      });
    }
  }

  async runTestGroup(testGroup: TestGroup) {
    this.emit(TestRunner.events.testGroupStarted, testGroup);
    await this.runBefore(testGroup);
    await this.runTests(testGroup);
    await this.runAfter(testGroup);
    this.emit(TestRunner.events.testGroupCompleted, testGroup);
  }

  async run(options: Options) {
    this.buildSuite(options);
    this.emit(TestRunner.events.testRunStarted);
    for (const testGroup of this.suite) await this.runTestGroup(testGroup);
    this.emit(TestRunner.events.testRunCompleted);
  }
}

export const testRunner = new TestRunner(Reporter);
